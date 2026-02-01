import { Button } from "@/components/ui/button";
import CrisisBox from "@/components/CrisisBox";
import QuestionRow from "./QuestionRow";
import ScoringDialog from "./ScoringDialog";
import { AssessmentConfig } from "@/types/assessment";

interface QuizScreenProps {
  config: AssessmentConfig;
  answers: Record<number, number>;
  onSelect: (questionIndex: number, value: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  allQuestionsAnswered: boolean;
}

const QuizScreen = ({
  config,
  answers,
  onSelect,
  onSubmit,
  onBack,
  allQuestionsAnswered,
}: QuizScreenProps) => {
  const { questions, responseOptions, responseLabels, questionCount } = config;
  
  // Check if this assessment has positive items (like PSS)
  const hasPositiveItems = questions.some(q => q.isPositive);
  
  // Some assessments (e.g., MDQ) use per-question options and suppress global legend
  const suppressGlobalLegend = config.customScoring !== undefined;
  
  // Format response legend based on option count (skip for assessments with per-question options)
  const renderResponseLegend = () => {
    if (suppressGlobalLegend) return null;
    const items = responseLabels.map((opt) => (
      <span key={opt.value}>
        <strong className="text-primary">{opt.value}</strong> = {opt.label}
      </span>
    ));
    
    return (
      <div className="bg-muted rounded-xl p-4 mb-6">
        <div className={`flex flex-wrap items-center justify-center ${responseLabels.length >= 5 ? 'gap-3' : 'gap-4'} text-sm`}>
          {items}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-2">
          {config.quizHeader}
        </h1>
        <p className="text-muted-foreground">
          {config.quizSubheader}
        </p>
      </div>

      {/* Response legend */}
      {renderResponseLegend()}

      {/* Reverse scoring note (for PSS-like assessments) */}
      {hasPositiveItems && (
        <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mb-6 text-sm">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Items marked as "(positive item)" are reverse-scored automatically in the final calculation.
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
        {questions.map((question, index) => {
          // For PHQ-9, question 9 (index 8) is the self-harm question
          const isLastQuestionHighlighted = 
            config.crisis.flaggedQuestionIndex === index;
          const options = question.options ?? responseOptions;
          
          return (
            <div key={index}>
              {question.sectionLabel && (
                <div className="pt-4 pb-2 first:pt-0">
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide text-primary">
                    {question.sectionLabel}
                  </h4>
                </div>
              )}
              <QuestionRow
                questionNumber={index + 1}
                questionText={question.text}
                selectedValue={answers[index] ?? null}
                onSelect={(value) => onSelect(index, value)}
                options={options}
                isPositiveItem={question.isPositive}
                isHighlighted={isLastQuestionHighlighted}
                highlightType="warning"
              />
            </div>
          );
        })}
      </div>

      {/* Scoring popup link */}
      <div className="flex justify-center mb-6">
        <ScoringDialog config={config} />
      </div>

      {/* Submit button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="hero" 
          size="lg" 
          onClick={onSubmit}
          disabled={!allQuestionsAnswered}
        >
          View My Results
        </Button>
      </div>

      {!allQuestionsAnswered && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Please answer all {questionCount} questions to see your results
        </p>
      )}

      <div className="mt-8">
        <CrisisBox />
      </div>
    </div>
  );
};

export default QuizScreen;
