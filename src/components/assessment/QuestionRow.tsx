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

  // Use flexible sizing when labels are long (e.g., substance names, multi-word options)
  const maxLabelLength = Math.max(...options.map((o) => o.label.length));
  const useFlexibleButtons = maxLabelLength > 12;

  return (
    <div
      className={cn(
        "py-4 border-b border-border/50 last:border-b-0",
        isHighlighted && highlightStyles[highlightType],
        isPositiveItem && !isHighlighted && "bg-sage/5 -mx-4 px-4 rounded-lg border border-sage/20"
      )}
    >
      {/* When options have long labels, use vertical layout (question above, options below) */}
      <div
        className={cn(
          "flex gap-4",
          useFlexibleButtons ? "flex-col" : "flex-col sm:flex-row sm:items-center"
        )}
      >
        <div className={useFlexibleButtons ? "w-full" : "flex-1 min-w-0"}>
          <p className="text-foreground leading-relaxed">
            <span className="font-semibold text-primary mr-2">{questionNumber}.</span>
            {questionText}
            {isPositiveItem && (
              <span className="text-xs text-sage ml-2">(positive item)</span>
            )}
          </p>
        </div>
        <div
          className={cn(
            "flex flex-wrap items-center gap-2 sm:gap-3",
            useFlexibleButtons ? "w-full pt-1" : "flex-shrink-0"
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={cn(
                "min-h-10 rounded-lg border-2 font-semibold transition-all",
                "hover:border-primary hover:bg-primary/5",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                selectedValue === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card/60 text-foreground/75",
                // Flexible sizing for long labels; compact for short (numeric)
                useFlexibleButtons
                  ? "px-3 py-2 sm:px-4 sm:py-2.5 text-sm text-center whitespace-normal leading-tight min-w-[5rem] max-w-[10rem] inline-flex items-center justify-center"
                  : "w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg shrink-0"
              )}
              aria-label={option.label}
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
