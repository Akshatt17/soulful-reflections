import { cn } from "@/lib/utils";

interface PSSQuestionRowProps {
  questionNumber: number;
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  isPositiveItem?: boolean;
}

const PSSQuestionRow = ({
  questionNumber,
  questionText,
  selectedValue,
  onSelect,
  isPositiveItem = false,
}: PSSQuestionRowProps) => {
  const options = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  return (
    <div
      className={cn(
        "py-4 border-b border-border/50 last:border-b-0",
        isPositiveItem && "bg-sage/5 -mx-4 px-4 rounded-lg border border-sage/20"
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-foreground leading-relaxed">
            <span className="font-semibold text-primary mr-2">{questionNumber}.</span>
            {questionText}
            {isPositiveItem && (
              <span className="text-xs text-sage ml-2">(positive item)</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 font-semibold text-base transition-all",
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

export default PSSQuestionRow;
