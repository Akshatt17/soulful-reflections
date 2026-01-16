import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X, Sparkles } from "lucide-react";

interface QuestionOption {
  label: string;
  value: number;
}

interface QuizStepProps {
  question: string;
  context?: string;
  options: QuestionOption[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onExit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizStep = ({
  question,
  context,
  options,
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  onExit,
  isFirst,
  isLast,
}: QuizStepProps) => {
  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main card */}
      <div className="relative bg-card rounded-3xl p-8 md:p-10 shadow-elevated border border-border/50 animate-fade-in">
        {/* Decorative icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-sage/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Context text */}
        {context && (
          <p className="text-muted-foreground text-sm text-center mb-4 max-w-md mx-auto">
            {context}
          </p>
        )}

        {/* Question */}
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground text-center mb-8 leading-relaxed max-w-lg mx-auto">
          {question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-10 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full p-4 md:p-5 rounded-2xl text-left transition-all duration-300 border-2 group relative overflow-hidden ${
                selectedValue === option.value
                  ? "border-primary bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                  : "border-border bg-background hover:border-primary/40 hover:bg-muted/50 text-foreground"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Selection indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  selectedValue === option.value 
                    ? "border-primary-foreground bg-primary-foreground" 
                    : "border-muted-foreground/40 group-hover:border-primary/60"
                }`}>
                  {selectedValue === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className={`font-medium ${selectedValue === option.value ? "text-primary-foreground" : ""}`}>
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            {!isFirst && (
              <Button
                variant="ghost"
                onClick={onPrevious}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          <button
            onClick={onExit}
            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1.5 transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
          >
            <X className="w-4 h-4" />
            Exit
          </button>

          <Button
            variant="hero"
            onClick={onNext}
            disabled={selectedValue === null}
            className="gap-2 px-6"
          >
            {isLast ? "View Results" : "Next"}
            {!isLast && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizStep;
