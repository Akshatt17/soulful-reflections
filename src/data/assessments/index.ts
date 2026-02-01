// Assessment Registry
// Central export for all assessment configurations
// To add a new assessment:
// 1. Create a new file (e.g., newTool.ts) with the AssessmentConfig
// 2. Import and add it to the assessmentRegistry below
// 3. Add the tool to tools.json for the tools listing page

import { AssessmentConfig, AssessmentRegistry, ScoreInterpretation, CustomScoringResult } from "@/types/assessment";
import { phq9Config } from "./phq9";
import { gad7Config } from "./gad7";
import { pssConfig } from "./pss";
import { isiConfig } from "./isi";
import { ociRConfig } from "./oci-r";
import { mdqConfig } from "./mdq";
import { assistConfig } from "./assist";

// Registry of all available assessments
export const assessmentRegistry: AssessmentRegistry = {
  phq9: phq9Config,
  gad7: gad7Config,
  pss: pssConfig,
  isi: isiConfig,
  "oci-r": ociRConfig,
  mdq: mdqConfig,
  assist: assistConfig,
};

// Helper function to get assessment by ID
export const getAssessment = (id: string): AssessmentConfig | undefined => {
  return assessmentRegistry[id];
};

// Helper function to check if an assessment exists
export const hasAssessment = (id: string): boolean => {
  return id in assessmentRegistry;
};

// Helper function to get all assessment IDs
export const getAssessmentIds = (): string[] => {
  return Object.keys(assessmentRegistry);
};

// Helper function to calculate score with optional reverse scoring
export const calculateScore = (
  answers: Record<number, number>,
  config: AssessmentConfig
): number => {
  const reverseIndices = config.reverseScoreIndices || [];
  const maxOptionValue = Math.max(...config.responseOptions.map(o => o.value));
  
  return Object.entries(answers).reduce((sum, [indexStr, val]) => {
    const index = parseInt(indexStr);
    if (reverseIndices.includes(index)) {
      // Reverse score: max - val
      return sum + (maxOptionValue - val);
    }
    return sum + val;
  }, 0);
};

// Helper function to get score interpretation
export const getScoreInterpretation = (
  score: number,
  config: AssessmentConfig
): ScoreInterpretation => {
  const band = config.scoringBands.find(
    (b) => score >= b.range[0] && score <= b.range[1]
  );
  
  if (!band) {
    // Fallback to the highest band if score exceeds all ranges
    const highestBand = config.scoringBands[config.scoringBands.length - 1];
    return {
      range: `${highestBand.range[0]}-${highestBand.range[1]}`,
      title: highestBand.title,
      description: highestBand.description,
      reflection: highestBand.reflection,
      severity: highestBand.severity,
    };
  }
  
  return {
    range: `${band.range[0]}-${band.range[1]}`,
    title: band.title,
    description: band.description,
    reflection: band.reflection,
    severity: band.severity,
  };
};

// Helper to get assessment result (handles both standard and custom scoring)
export const getAssessmentResult = (
  answers: Record<number, number>,
  config: AssessmentConfig
): { totalScore: number; displayMax: number; interpretation: ScoreInterpretation; showCrisis: boolean } => {
  if (config.customScoring) {
    const result: CustomScoringResult = config.customScoring(answers, config);
    return {
      totalScore: result.displayScore,
      displayMax: result.displayMax,
      interpretation: result.interpretation,
      showCrisis: result.showCrisis,
    };
  }
  const totalScore = calculateScore(answers, config);
  return {
    totalScore,
    displayMax: config.maxScore,
    interpretation: getScoreInterpretation(totalScore, config),
    showCrisis: shouldShowCrisisResources(totalScore, answers, config),
  };
};

// Helper function to check if crisis resources should be shown
export const shouldShowCrisisResources = (
  score: number,
  answers: Record<number, number>,
  config: AssessmentConfig
): boolean => {
  // Check score threshold
  if (score >= config.crisis.threshold) {
    return true;
  }
  
  // Check flagged question (e.g., PHQ-9 question 9)
  if (config.crisis.flaggedQuestionIndex !== undefined) {
    const flaggedAnswer = answers[config.crisis.flaggedQuestionIndex];
    if (flaggedAnswer !== undefined && flaggedAnswer > 0) {
      return true;
    }
  }
  
  return false;
};

// Export individual configs for direct access if needed
export { phq9Config, gad7Config, pssConfig, isiConfig, ociRConfig, mdqConfig, assistConfig };
