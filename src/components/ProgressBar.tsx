interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-card rounded-2xl p-6 shadow-soft border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">{current}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Question {current} of {total}</p>
            <p className="text-xs text-muted-foreground">Take your time with each question</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-primary">{Math.round(percentage)}%</span>
          <p className="text-xs text-muted-foreground">complete</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-sage rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < current 
                ? "bg-primary" 
                : i === current - 1 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
