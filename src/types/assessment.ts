// Assessment Type Definitions
// This file contains all TypeScript interfaces for the modular assessment system

export interface ResponseOption {
  value: number;
  label: string;
}

export interface Question {
  text: string;
  isPositive?: boolean; // For reverse-scored items (e.g., PSS positive items)
  options?: ResponseOption[]; // Per-question response options (overrides config default)
  sectionLabel?: string; // Optional section header (e.g., "Part 1", "Part 2")
}

export interface ScoringBand {
  range: [number, number]; // [min, max] inclusive
  title: string;
  description: string;
  reflection: string;
  severity: string;
  borderColor: string;
  bgColor: string;
  badgeColor: string;
  badgeTextColor: string;
}

export interface CrisisConfig {
  threshold: number; // Score threshold for showing crisis resources
  flaggedQuestionIndex?: number; // Optional: question index that triggers crisis resources regardless of score
  title: string;
  message: string;
}

export interface IntroConfig {
  subtitle: string;
  title: string;
  tagline: string;
  about: string;
  importantNote?: string;
  howToAnswer: {
    prompt: string;
    instructions: string[];
  };
  duration: string;
}

export interface AssessmentConfig {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  
  // Questions
  questions: Question[];
  questionCount: number;
  
  // Response options
  responseOptions: ResponseOption[];
  responseLabels: { value: number; label: string }[]; // For legend display
  
  // Scoring
  maxScore: number;
  scoringBands: ScoringBand[];
  reverseScoreIndices?: number[]; // Indices of questions to reverse-score (0-indexed)
  
  // UI Configuration
  intro: IntroConfig;
  quizHeader: string;
  quizSubheader: string;
  
  // Crisis resources
  crisis: CrisisConfig;
  
  // Results page
  gentleReminder: string;
  
  // Scoring dialog
  scoringGuide: {
    title: string;
    howToScore: string;
    reverseScoreNote?: string;
  };

  // Optional: custom scoring logic for assessments like MDQ (positive/negative screen)
  customScoring?: CustomScoringFn;
}

// Helper type for getting score interpretation
export interface ScoreInterpretation {
  range: string;
  title: string;
  description: string;
  reflection: string;
  severity: string;
  // Optional custom score display for assessments like MDQ (positive/negative screen)
  scoreDisplayValue?: string;
  scoreDisplaySubtitle?: string;
}

// Custom scoring for assessments with non-standard logic (e.g., MDQ)
export interface CustomScoringResult {
  displayScore: number;
  displayMax: number;
  interpretation: ScoreInterpretation;
  showCrisis: boolean;
}

export type CustomScoringFn = (
  answers: Record<number, number>,
  config: AssessmentConfig
) => CustomScoringResult;

// Registry type for all assessments
export type AssessmentRegistry = Record<string, AssessmentConfig>;
