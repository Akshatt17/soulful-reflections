import { cn } from "@/lib/utils";
import { ResponseOption } from "@/types/assessment";

interface QuestionRowProps {
  questionNumber: number;
  questionText: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  options: ResponseOption[];
  isPositiveItem?: boolean;
  isHighlighted?: boolean; // For special questions like PHQ-9 Q9
  highlightType?: "warning" | "info"; // warning = destructive, info = sage
}

const QuestionRow = ({
  questionNumber,
  questionText,
  selectedValue,
  onSelect,
  options,
  isPositiveItem = false,
  isHighlighted = false,
  highlightType = "warning",
}: QuestionRowProps) => {
  const highlightStyles = {
    warning: "bg-destructive/5 -mx-4 px-4 rounded-lg border border-destructive/20",
    info: "bg-sage/5 -mx-4 px-4 rounded-lg border border-sage/20",
  };

  // Determine button size based on number of options
  const isCompact = options.length >= 5;
  const buttonSize = isCompact ? "w-9 h-9 sm:w-10 sm:h-10 text-base" : "w-10 h-10 sm:w-12 sm:h-12 text-lg";
  const gapSize = isCompact ? "gap-2 sm:gap-2.5" : "gap-2 sm:gap-3";

  return (
    <div
      className={cn(
        "py-4 border-b border-border/50 last:border-b-0",
        isHighlighted && highlightStyles[highlightType],
        isPositiveItem && !isHighlighted && "bg-sage/5 -mx-4 px-4 rounded-lg border border-sage/20"
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
        <div className={cn("flex items-center flex-shrink-0", gapSize)}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                buttonSize,
                "rounded-lg border-2 font-semibold transition-all",
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

export default QuestionRow;
