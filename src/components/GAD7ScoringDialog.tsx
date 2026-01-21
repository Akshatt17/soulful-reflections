import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const GAD7ScoringDialog = () => {
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
            GAD-7 Scoring Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">How to Score</h3>
            <p className="text-sm text-muted-foreground">
              Add up your scores for all 7 questions. Total score range: <strong>0 to 21</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">What Your Total Score May Reflect</h3>

            {/* 0-4: Minimal */}
            <div className="border border-sage/30 bg-sage/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-sage/20 text-sage text-xs font-semibold rounded">0-4</span>
                <h4 className="font-semibold text-foreground">Minimal Anxiety</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses suggest that anxiety is not strongly present right now, or it is showing up only occasionally. You may still have stressful days, but they do not seem to be taking over your inner space.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Keep supporting your nervous system with rest, routine, and connection.
              </p>
            </div>

            {/* 5-9: Mild */}
            <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-amber-500/20 text-amber-700 text-xs font-semibold rounded">5-9</span>
                <h4 className="font-semibold text-foreground">Mild Anxiety</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your answers suggest that worry or tension has been visiting more often than you would like. It may come and go, but it is asking for gentle attention.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Consider grounding practices (slow breathing, movement, journaling) and talk to someone you trust if it continues.
              </p>
            </div>

            {/* 10-14: Moderate */}
            <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-500/20 text-orange-700 text-xs font-semibold rounded">10-14</span>
                <h4 className="font-semibold text-foreground">Moderate Anxiety</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses indicate anxiety that may be affecting focus, sleep, or everyday comfort. You might be spending a noticeable amount of energy managing worry.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> It can really help to consult a mental health professional for practical strategies and support.
              </p>
            </div>

            {/* 15-21: Severe */}
            <div className="border border-destructive/50 bg-destructive/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-destructive/30 text-destructive text-xs font-semibold rounded">15-21</span>
                <h4 className="font-semibold text-foreground">Severe Anxiety</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your answers suggest intense anxiety that may be significantly interfering with your life. Living in this state can be exhausting, and you do not have to carry it alone.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Please seek professional help soon. Support can reduce suffering and help you feel safe in your body and mind again.
              </p>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">If You Feel Unsafe</h4>
                <p className="text-sm text-muted-foreground">
                  If you are having thoughts of harming yourself, feel unable to stay safe, or feel in immediate danger, seek urgent help from local emergency services or the nearest hospital, or reach out to someone you trust right now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GAD7ScoringDialog;
