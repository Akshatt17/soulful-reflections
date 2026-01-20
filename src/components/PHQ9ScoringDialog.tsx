import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHQ9ScoringDialog = () => {
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
            PHQ-9 Scoring Guide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">How to Score</h3>
            <p className="text-sm text-muted-foreground">
              Add up your scores for all 9 questions. Total score range: <strong>0 to 27</strong>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">What Your Total Score May Reflect</h3>

            {/* 0-4: Minimal */}
            <div className="border border-sage/30 bg-sage/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-sage/20 text-sage text-xs font-semibold rounded">0-4</span>
                <h4 className="font-semibold text-foreground">Minimal or No Depression</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses suggest your emotional state is fairly balanced right now. Occasional low days may still happen, but they do not seem to be weighing heavily on your daily life.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> You appear to have emotional resilience at this moment. Keep nurturing yourself through rest, connection, and self-care.
              </p>
            </div>

            {/* 5-9: Mild */}
            <div className="border border-amber-500/30 bg-amber-500/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-amber-500/20 text-amber-700 text-xs font-semibold rounded">5-9</span>
                <h4 className="font-semibold text-foreground">Mild Depressive Symptoms</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your answers suggest subtle emotional heaviness - perhaps low motivation, disturbed sleep, or moments of sadness that come and go.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Your mind may be asking for gentle attention. If these feelings persist or grow, consider speaking with a mental health professional.
              </p>
            </div>

            {/* 10-14: Moderate */}
            <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-500/20 text-orange-700 text-xs font-semibold rounded">10-14</span>
                <h4 className="font-semibold text-foreground">Moderate Depression</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses indicate distress that may be affecting sleep, energy, focus, or enjoyment. Daily tasks may feel heavier.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> You are not weak - you may be overwhelmed. We strongly recommend consulting a mental health professional for support.
              </p>
            </div>

            {/* 15-19: Moderately Severe */}
            <div className="border border-destructive/30 bg-destructive/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-destructive/20 text-destructive text-xs font-semibold rounded">15-19</span>
                <h4 className="font-semibold text-foreground">Moderately Severe Depression</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your answers suggest significant emotional pain that may be interfering with personal, professional, or social life.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> This is a moment to reach out. Please seek professional support as soon as possible. Therapy and/or medical support can help you regain stability and hope.
              </p>
            </div>

            {/* 20-27: Severe */}
            <div className="border border-destructive/50 bg-destructive/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-destructive/30 text-destructive text-xs font-semibold rounded">20-27</span>
                <h4 className="font-semibold text-foreground">Severe Depression</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses indicate intense distress that is likely affecting multiple areas of life. Support is not just recommended - it is necessary and available.
              </p>
              <p className="text-sm text-primary italic">
                <strong>Soulful Reflection:</strong> Please consult a psychiatrist or mental health professional urgently. If you are having thoughts of harming yourself, seek immediate help from emergency services or someone you trust nearby.
              </p>
            </div>
          </div>

          {/* Question 9 Warning */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Special Attention to Question 9</h4>
                <p className="text-sm text-muted-foreground">
                  If you marked any option other than "Not at all" for Question 9, please seek help immediately, regardless of your total score. <strong>Your safety matters more than any number.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PHQ9ScoringDialog;
