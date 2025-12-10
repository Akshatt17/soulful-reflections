import { Button } from "@/components/ui/button";

interface QuestionOption {
  label: string;
  value: number;
}

interface QuizStepProps {
  question: string;
  options: QuestionOption[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizStep = ({
  question,
  options,
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuizStepProps) => {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl font-bold text-primary text-center">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
              selectedValue === option.value
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-card hover:border-primary/50 text-foreground"
            }`}
          >
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className={isFirst ? "invisible" : ""}
        >
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={onNext}
          disabled={selectedValue === null}
        >
          {isLast ? "View Results" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default QuizStep;
