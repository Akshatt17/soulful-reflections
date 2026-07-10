import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentConfig } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface ScoringDialogProps {
  config: AssessmentConfig;
}

const ScoringDialog = ({ config }: ScoringDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Info className="w-4 h-4" />
          View Scoring Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">
            {config.scoringGuide.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* How to Score */}
          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">How to Score</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {config.scoringGuide.howToScore}
            </p>
            {config.scoringGuide.reverseScoreNote && (
              <div className="bg-card rounded-lg p-3 text-sm">
                <p className="font-medium text-foreground mb-2">Reverse-scoring key (for items 4, 5, 7, 8):</p>
                <p className="text-muted-foreground">{config.scoringGuide.reverseScoreNote.replace("Reverse-scoring key (for items 4, 5, 7, 8): ", "")}</p>
              </div>
            )}
          </div>

          {/* Scoring Bands */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">What Your Total Score May Reflect</h3>

            {config.scoringBands.map((band) => (
              <div
                key={band.title}
                className={cn("border rounded-xl p-4", band.borderColor, band.bgColor)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn("px-2 py-1 text-xs font-semibold rounded", band.badgeColor, band.badgeTextColor)}>
                    {band.range[0]}-{band.range[1]}
                  </span>
                  <h4 className="font-semibold text-foreground">{band.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {band.description}
                </p>
                <p className="text-sm text-primary italic">
                  <strong>Reflection:</strong> {band.reflection}
                </p>
              </div>
            ))}
          </div>

          {/* Safety Warning */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  {config.crisis.flaggedQuestionIndex !== undefined 
                    ? "Special Attention to Question 9" 
                    : config.crisis.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {config.crisis.flaggedQuestionIndex !== undefined ? (
                    <>
                      If you marked any option other than "Not at all" for Question 9, please seek help immediately, regardless of your total score. <strong>Your safety matters more than any number.</strong>
                    </>
                  ) : (
                    config.crisis.message
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoringDialog;
