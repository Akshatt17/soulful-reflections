import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CrisisBox from "@/components/CrisisBox";
import ScoringDialog from "./ScoringDialog";
import { 
  CheckCircle, 
  Lock, 
  Mail, 
  BookOpen, 
  Eye, 
  Wrench, 
  AlertTriangle, 
  Heart 
} from "lucide-react";
import { AssessmentConfig, ScoreInterpretation } from "@/types/assessment";

interface ResultsScreenProps {
  config: AssessmentConfig;
  totalScore: number;
  displayMax: number;
  scoreInterpretation: ScoreInterpretation;
  showCrisisResources: boolean;
  showQuestion9Warning?: boolean; // For PHQ-9 specific warning
  answers: Record<number, number>;
  // Email capture state
  email: string;
  setEmail: (email: string) => void;
  name: string;
  setName: (name: string) => void;
  consent: boolean;
  setConsent: (consent: boolean) => void;
  showEmailCapture: boolean;
  setShowEmailCapture: (show: boolean) => void;
  onEmailSubmit: (e: React.FormEvent) => void;
  onRetake: () => void;
}

const ResultsScreen = ({
  config,
  totalScore,
  displayMax,
  scoreInterpretation,
  showCrisisResources,
  showQuestion9Warning = false,
  answers,
  email,
  setEmail,
  name,
  setName,
  consent,
  setConsent,
  showEmailCapture,
  setShowEmailCapture,
  onEmailSubmit,
  onRetake,
}: ResultsScreenProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-sage/25 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-forest" />
      </div>

      <h1 className="font-serif text-3xl font-bold text-primary mb-2">
        Your Results
      </h1>
      <p className="text-foreground/75 mb-8">
        <Lock className="w-4 h-4 inline mr-1" />
        Your responses are private and stored only on your device
      </p>

      {/* Score display */}
      <div className="glass-panel p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-primary mb-2">
            {scoreInterpretation.scoreDisplayValue ?? totalScore}
          </div>
          <div className="text-sm text-foreground/70">
            {scoreInterpretation.scoreDisplaySubtitle ?? `out of ${displayMax}`}
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-3">
            <span className="font-semibold text-primary">{scoreInterpretation.title}</span>
          </div>
          <p className="text-foreground/80">{scoreInterpretation.description}</p>
        </div>
      </div>

      {/* Reflection */}
      <div className="glass-panel p-6 mb-6 text-left">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Heart className="w-5 h-5 text-forest" />
          Reflection
        </h3>
        <p className="text-foreground/80 italic">{scoreInterpretation.reflection}</p>
      </div>

      {/* Question 9 Warning (PHQ-9 specific) */}
      {showQuestion9Warning && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-6 text-left">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Notice About Question 9</h3>
              <p className="text-sm text-foreground/75">
                You indicated experiencing thoughts about harming yourself. Regardless of your total score, 
                please seek help immediately. <strong>Your safety matters more than any number.</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Crisis resources if needed */}
      {showCrisisResources && (
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">{config.crisis.title}</h3>
              <p className="text-sm text-foreground/80 mb-3">
                {config.crisis.message}
              </p>
              <div className="space-y-2 text-sm">
                <a href="tel:988" className="block text-primary font-medium hover:underline">
                  988 Suicide & Crisis Lifeline
                </a>
                <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="block text-primary font-medium hover:underline">
                  Crisis Text Line - Text HOME to 741741
                </a>
                <Link to="/crisis" className="block text-primary font-medium hover:underline">
                  View All Crisis Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gentle Reminder - shown in ALL results */}
      <div className="glass-panel border-primary/20 p-6 mb-6 text-left">
        <h3 className="font-semibold text-foreground mb-2">A Gentle Reminder</h3>
        <p className="text-foreground/80">
          {config.gentleReminder}
        </p>
      </div>

      {/* Save Results Option */}
      {!showEmailCapture ? (
        <div className="glass-panel p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-foreground mb-1">Save Your Results</h3>
              <p className="text-sm text-foreground/75">
                Receive a copy of your results via email to keep for yourself.
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowEmailCapture(true)}>
              <Mail className="w-4 h-4 mr-2" />
              Save via Email
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onEmailSubmit} className="glass-panel p-6 mb-6 text-left">
          <h3 className="font-semibold text-foreground mb-4">Enter Your Email</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                I agree to receive my results via email and understand that my responses 
                will be saved to personalize my experience.
              </label>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowEmailCapture(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={!email || !consent}>
                Save Results
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Suggested Resources */}
      <div className="glass-panel p-6 mb-8 text-left">
        <h3 className="font-semibold text-foreground mb-4">You May Find These Helpful</h3>
        <div className="grid gap-3">
          <Link 
            to="/articles" 
            className="flex items-center gap-3 p-3 bg-card/50 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-foreground">Explore related articles</span>
          </Link>
          <Link 
            to="/media" 
            className="flex items-center gap-3 p-3 bg-card/50 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <Eye className="w-5 h-5 text-primary" />
            <span className="text-foreground">Listen to audio reflections</span>
          </Link>
          <Link 
            to="/tools" 
            className="flex items-center gap-3 p-3 bg-card/50 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <Wrench className="w-5 h-5 text-primary" />
            <span className="text-foreground">Try other self-reflection tools</span>
          </Link>
        </div>
      </div>

      {/* Scoring Guide Link */}
      <div className="flex justify-center mb-6">
        <ScoringDialog config={config} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button variant="outline" onClick={onRetake}>
          Take Again
        </Button>
        <Button variant="hero" onClick={() => navigate("/tools")}>
          Explore Other Tools
        </Button>
      </div>

      <CrisisBox />
    </div>
  );
};

export default ResultsScreen;
