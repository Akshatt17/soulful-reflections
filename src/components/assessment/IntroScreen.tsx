import { Button } from "@/components/ui/button";
import CrisisBox from "@/components/CrisisBox";
import { Shield, Heart, Clock } from "lucide-react";
import { AssessmentConfig } from "@/types/assessment";

interface IntroScreenProps {
  config: AssessmentConfig;
  onStart: () => void;
}

const IntroScreen = ({ config, onStart }: IntroScreenProps) => {
  const { intro, responseLabels } = config;
  
  return (
    <div className="text-center">
      <div className="radial-tint py-4 mb-4">
        <p className="text-sm text-foreground/70 mb-2">{intro.subtitle}</p>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
          {intro.title}
        </h1>
        <p className="text-lg text-foreground/80">
          {intro.tagline}
        </p>
      </div>

      {/* About section */}
      <div className="glass-panel p-6 mb-6 text-left">
        <p className="text-foreground/80">
          {intro.about}
        </p>
        {intro.importantNote && (
          <p className="text-foreground/80 mt-3 text-sm italic">
            <strong>Important:</strong> {intro.importantNote}
          </p>
        )}
      </div>

      {/* How to answer */}
      <div className="glass-panel p-6 mb-8 text-left">
        <h3 className="font-semibold text-foreground mb-3">How to Answer</h3>
        {intro.howToAnswer.prompt && (
          <p className="text-foreground/80 mb-3">
            {intro.howToAnswer.prompt}
          </p>
        )}
        <ul className="space-y-2 text-foreground/80">
          {intro.howToAnswer.instructions.map((instruction, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>

      {/* Response options legend */}
      <div className="glass-panel p-6 mb-8">
        <h3 className="font-semibold text-foreground mb-4">Response Options</h3>
        <div className={`grid grid-cols-2 ${responseLabels.length <= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-5'} gap-3`}>
          {responseLabels.map((option) => (
            <div key={option.value} className="text-center p-3 bg-card/50 rounded-xl">
              <div className="text-2xl font-bold text-primary mb-1">{option.value}</div>
              <div className="text-sm text-foreground/75">{option.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before you begin */}
      <div className="glass-panel p-6 mb-8 text-left">
        <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-foreground/80">
            <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-3 h-3 text-forest" />
            </span>
            <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
          </li>
          <li className="flex items-start gap-3 text-foreground/80">
            <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Heart className="w-3 h-3 text-forest" />
            </span>
            <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
          </li>
          <li className="flex items-start gap-3 text-foreground/80">
            <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-3 h-3 text-forest" />
            </span>
            <span><strong>Your pace:</strong> Takes {intro.duration}</span>
          </li>
        </ul>
      </div>

      <Button variant="hero" size="lg" onClick={onStart}>
        Start Questionnaire
      </Button>

      <div className="mt-8">
        <CrisisBox />
      </div>
    </div>
  );
};

export default IntroScreen;
