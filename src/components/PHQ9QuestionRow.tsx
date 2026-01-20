import { cn } from "@/lib/utils";

interface PHQ9QuestionRowProps {
  questionNumber: number;
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  isLastQuestion?: boolean;
}

const PHQ9QuestionRow = ({
  questionNumber,
  questionText,
  selectedValue,
  onSelect,
  isLastQuestion = false,
}: PHQ9QuestionRowProps) => {
  const options = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  return (
    <div
      className={cn(
        "py-4 border-b border-border/50 last:border-b-0",
        isLastQuestion && "bg-destructive/5 -mx-4 px-4 rounded-lg border border-destructive/20"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-foreground leading-relaxed">
            <span className="font-semibold text-primary mr-2">{questionNumber}.</span>
            {questionText}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 font-semibold text-lg transition-all",
                "hover:border-primary hover:bg-primary/5",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                selectedValue === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground"
              )}
              aria-label={`Score ${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PHQ9QuestionRow;
