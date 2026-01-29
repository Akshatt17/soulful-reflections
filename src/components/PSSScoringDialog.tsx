import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PSSScoringDialog = () => {
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
            PSS Scoring Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">How to Score</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add up your scores for all 10 items. <strong>Important:</strong> Items 4, 5, 7, and 8 are positively-worded and must be reverse-scored before totaling.
            </p>
            <div className="bg-card rounded-lg p-3 text-sm">
              <p className="font-medium text-foreground mb-2">Reverse-scoring key (for items 4, 5, 7, 8):</p>
              <p className="text-muted-foreground">0→4, 1→3, 2→2, 3→1, 4→0</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Total score range: <strong>0 to 40</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">What Your Total Score May Reflect</h3>

            {/* 0-13: Lower perceived stress */}
            <div className="border border-sage/30 bg-sage/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-sage/20 text-sage text-xs font-semibold rounded">0-13</span>
                <h4 className="font-semibold text-foreground">Lower Perceived Stress</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses suggest that stress has felt manageable lately. You may still have busy days, but you're generally able to steady yourself and recover.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> You seem to have space to breathe. Keep protecting your routines, rest, and supportive connections.
              </p>
            </div>

            {/* 14-26: Moderate perceived stress */}
            <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-amber-500/20 text-amber-700 text-xs font-semibold rounded">14-26</span>
                <h4 className="font-semibold text-foreground">Moderate Perceived Stress</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your answers suggest that stress has been present and noticeable. You might be juggling a lot mentally, feeling more reactive, or finding it harder to switch off.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Your mind may be asking for gentleness, boundaries, and small moments of release. If this feels persistent, consider speaking with a mental health professional or a trusted guide.
              </p>
            </div>

            {/* 27-40: Higher perceived stress */}
            <div className="border border-destructive/50 bg-destructive/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-destructive/30 text-destructive text-xs font-semibold rounded">27-40</span>
                <h4 className="font-semibold text-foreground">Higher Perceived Stress</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses indicate that stress has been feeling heavy or constant, possibly affecting sleep, mood, focus, or physical well-being.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> You've been carrying a lot. You don't have to hold it alone. We strongly recommend seeking support from a mental health professional, especially if stress is affecting your daily functioning.
              </p>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">A Safety Note</h4>
                <p className="text-sm text-muted-foreground">
                  If stress is accompanied by panic, hopelessness, thoughts of self-harm, or you feel unsafe, please seek urgent support from local emergency services or a trusted person nearby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PSSScoringDialog;
