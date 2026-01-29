import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import CrisisBox from "@/components/CrisisBox";
import PHQ9QuestionRow from "@/components/PHQ9QuestionRow";
import PSSQuestionRow from "@/components/PSSQuestionRow";
import PHQ9ScoringDialog from "@/components/PHQ9ScoringDialog";
import GAD7ScoringDialog from "@/components/GAD7ScoringDialog";
import PSSScoringDialog from "@/components/PSSScoringDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  CheckCircle, 
  Mail, 
  Eye, 
  Lock, 
  BookOpen, 
  Wrench, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Heart 
} from "lucide-react";
import toolsData from "@/data/tools.json";

type Screen = "intro" | "quiz" | "results";

// PHQ-9 softened question wording as per user requirements
const PHQ9_QUESTIONS = [
  "Little interest or pleasure in things you usually enjoy.",
  "Feeling down, low, or emotionally heavy.",
  "Trouble falling asleep, staying asleep, or sleeping too much.",
  "Feeling tired, low on energy, or slowed down.",
  "Changes in appetite - eating less than usual or eating more for comfort.",
  "Feeling disappointed in yourself, or feeling like you have let yourself or your loved ones down.",
  "Trouble focusing (for example, while reading, working, or watching something).",
  "Moving or speaking more slowly than usual, or feeling unusually restless or fidgety.",
  "Thoughts that you would be better off not here, or thoughts of harming yourself.",
];

// GAD-7 softened question wording
const GAD7_QUESTIONS = [
  "Feeling more nervous, anxious, or on edge than you would like.",
  "Finding it difficult to stop or manage worrying once it starts.",
  "Worrying about different things across the day (even small things).",
  "Feeling tense or restless inside, like it is hard to relax.",
  "Feeling so restless that sitting still feels difficult.",
  "Becoming easily irritated, short-tempered, or more sensitive than usual.",
  "Feeling as if something bad might happen, even when you cannot explain why.",
];

// PSS questions - items 4, 5, 7, 8 are positive (need reverse scoring)
const PSS_QUESTIONS = [
  { text: "…felt upset because something unexpected happened?", isPositive: false },
  { text: "…felt that you couldn't control some important things in your life?", isPositive: false },
  { text: "…felt nervous, stressed, or on edge?", isPositive: false },
  { text: "…felt confident about your ability to handle personal challenges?", isPositive: true },
  { text: "…felt that things were going your way?", isPositive: true },
  { text: "…found yourself unable to cope with all the things you had to do?", isPositive: false },
  { text: "…felt able to keep everyday irritations from taking over your day?", isPositive: true },
  { text: "…felt that you were on top of things (even if only in small ways)?", isPositive: true },
  { text: "…felt bothered by things that felt outside your control?", isPositive: false },
  { text: "…felt that difficulties were piling up so high that you couldn't overcome them?", isPositive: false },
];

// PHQ-9 Score interpretation based on user-provided scoring guide
const getPHQ9ScoreInterpretation = (score: number) => {
  if (score <= 4) {
    return {
      range: "0-4",
      title: "Minimal or No Depression",
      description: "Your responses suggest your emotional state is fairly balanced right now. Occasional low days may still happen, but they do not seem to be weighing heavily on your daily life.",
      reflection: "You appear to have emotional resilience at this moment. Keep nurturing yourself through rest, connection, and self-care.",
      severity: "minimal",
    };
  } else if (score <= 9) {
    return {
      range: "5-9",
      title: "Mild Depressive Symptoms",
      description: "Your answers suggest subtle emotional heaviness - perhaps low motivation, disturbed sleep, or moments of sadness that come and go.",
      reflection: "Your mind may be asking for gentle attention. If these feelings persist or grow, consider speaking with a mental health professional.",
      severity: "mild",
    };
  } else if (score <= 14) {
    return {
      range: "10-14",
      title: "Moderate Depression",
      description: "Your responses indicate distress that may be affecting sleep, energy, focus, or enjoyment. Daily tasks may feel heavier.",
      reflection: "You are not weak - you may be overwhelmed. We strongly recommend consulting a mental health professional for support.",
      severity: "moderate",
    };
  } else if (score <= 19) {
    return {
      range: "15-19",
      title: "Moderately Severe Depression",
      description: "Your answers suggest significant emotional pain that may be interfering with personal, professional, or social life.",
      reflection: "This is a moment to reach out. Please seek professional support as soon as possible. Therapy and/or medical support can help you regain stability and hope.",
      severity: "moderately-severe",
    };
  } else {
    return {
      range: "20-27",
      title: "Severe Depression",
      description: "Your responses indicate intense distress that is likely affecting multiple areas of life. Support is not just recommended - it is necessary and available.",
      reflection: "Please consult a psychiatrist or mental health professional urgently. If you are having thoughts of harming yourself, seek immediate help from emergency services or someone you trust nearby.",
      severity: "severe",
    };
  }
};

// GAD-7 Score interpretation
const getGAD7ScoreInterpretation = (score: number) => {
  if (score <= 4) {
    return {
      range: "0-4",
      title: "Minimal Anxiety",
      description: "Your responses suggest that anxiety is not strongly present right now, or it is showing up only occasionally. You may still have stressful days, but they do not seem to be taking over your inner space.",
      reflection: "Keep supporting your nervous system with rest, routine, and connection.",
      severity: "minimal",
    };
  } else if (score <= 9) {
    return {
      range: "5-9",
      title: "Mild Anxiety",
      description: "Your answers suggest that worry or tension has been visiting more often than you would like. It may come and go, but it is asking for gentle attention.",
      reflection: "Consider grounding practices (slow breathing, movement, journaling) and talk to someone you trust if it continues.",
      severity: "mild",
    };
  } else if (score <= 14) {
    return {
      range: "10-14",
      title: "Moderate Anxiety",
      description: "Your responses indicate anxiety that may be affecting focus, sleep, or everyday comfort. You might be spending a noticeable amount of energy managing worry.",
      reflection: "It can really help to consult a mental health professional for practical strategies and support.",
      severity: "moderate",
    };
  } else {
    return {
      range: "15-21",
      title: "Severe Anxiety",
      description: "Your answers suggest intense anxiety that may be significantly interfering with your life. Living in this state can be exhausting, and you do not have to carry it alone.",
      reflection: "Please seek professional help soon. Support can reduce suffering and help you feel safe in your body and mind again.",
      severity: "severe",
    };
  }
};

// PSS Score interpretation with reverse scoring for positive items
const getPSSScoreInterpretation = (score: number) => {
  if (score <= 13) {
    return {
      range: "0-13",
      title: "Lower Perceived Stress",
      description: "Your responses suggest that stress has felt manageable lately. You may still have busy days, but you're generally able to steady yourself and recover.",
      reflection: "You seem to have space to breathe. Keep protecting your routines, rest, and supportive connections.",
      severity: "low",
    };
  } else if (score <= 26) {
    return {
      range: "14-26",
      title: "Moderate Perceived Stress",
      description: "Your answers suggest that stress has been present and noticeable. You might be juggling a lot mentally, feeling more reactive, or finding it harder to switch off.",
      reflection: "Your mind may be asking for gentleness, boundaries, and small moments of release. If this feels persistent, consider speaking with a mental health professional or a trusted guide.",
      severity: "moderate",
    };
  } else {
    return {
      range: "27-40",
      title: "Higher Perceived Stress",
      description: "Your responses indicate that stress has been feeling heavy or constant, possibly affecting sleep, mood, focus, or physical well-being.",
      reflection: "You've been carrying a lot. You don't have to hold it alone. We strongly recommend seeking support from a mental health professional, especially if stress is affecting your daily functioning.",
      severity: "high",
    };
  }
};

const ToolAssessment = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = toolsData.tools.find((t) => t.id === toolId);

  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  if (!tool) {
    return (
      <PageLayout>
        <div className="section-padding text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Tool Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The assessment you're looking for doesn't exist.
          </p>
          <Link to="/tools">
            <Button variant="hero">Back to Tools</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const isPHQ9 = tool.id === "phq9";
  const isGAD7 = tool.id === "gad7";
  const isPSS = tool.id === "pss";
  const isStandardAssessment = isPHQ9 || isGAD7 || isPSS;

  const questionCount = isPHQ9 ? 9 : isGAD7 ? 7 : isPSS ? 10 : tool.questions.length;

  // Calculate PSS score with reverse scoring for positive items (4, 5, 7, 8 - indices 3, 4, 6, 7)
  const totalScore = useMemo(() => {
    if (isPSS) {
      const positiveItemIndices = [3, 4, 6, 7]; // 0-indexed: items 4, 5, 7, 8
      return Object.entries(answers).reduce((sum, [indexStr, val]) => {
        const index = parseInt(indexStr);
        if (positiveItemIndices.includes(index)) {
          // Reverse score: 0→4, 1→3, 2→2, 3→1, 4→0
          return sum + (4 - val);
        }
        return sum + val;
      }, 0);
    }
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  }, [answers, isPSS]);

  const allQuestionsAnswered = useMemo(() => {
    return Object.keys(answers).length === questionCount;
  }, [answers, questionCount]);

  const scoreInterpretation = useMemo(() => {
    if (isPHQ9) return getPHQ9ScoreInterpretation(totalScore);
    if (isGAD7) return getGAD7ScoreInterpretation(totalScore);
    if (isPSS) return getPSSScoreInterpretation(totalScore);
    return getPHQ9ScoreInterpretation(totalScore); // fallback
  }, [totalScore, isPHQ9, isGAD7, isPSS]);

  // Check if question 9 was answered > 0 (thoughts of self-harm)
  const question9Flagged = useMemo(() => {
    return answers[8] !== undefined && answers[8] > 0;
  }, [answers]);

  const showCrisisResources = useMemo(() => {
    if (isPHQ9) return question9Flagged || totalScore >= 15;
    if (isGAD7) return totalScore >= 15;
    if (isPSS) return totalScore >= 27;
    return false;
  }, [question9Flagged, totalScore, isPHQ9, isGAD7, isPSS]);

  const handleStart = () => setScreen("quiz");

  const handleSelect = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setScreen("results");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      const resultData = {
        toolId: tool.id,
        score: totalScore,
        date: new Date().toISOString(),
        answers,
        email,
        name: name || undefined,
      };
      const stored = localStorage.getItem("assessmentResults");
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem("assessmentResults", JSON.stringify([...existing, resultData]));
      setShowEmailCapture(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setEmail("");
    setName("");
    setConsent(false);
    setShowEmailCapture(false);
    setScreen("intro");
  };

  return (
    <PageLayout>
      <section className="section-padding bg-background min-h-[70vh]">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Link>

            {/* Intro Screen - PHQ-9 */}
            {screen === "intro" && isPHQ9 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
                  PHQ-9: Gentle Check-In for Low Mood
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  A self-reflection tool for the past 2 weeks
                </p>

                {/* About section */}
                <div className="bg-card rounded-2xl p-6 mb-6 text-left shadow-soft">
                  <p className="text-muted-foreground">
                    This questionnaire helps you notice patterns in mood, energy, sleep, and self-worth 
                    over the past two weeks. It is not a diagnosis. It is a screening and reflection tool 
                    that can guide you toward support if needed.
                  </p>
                </div>

                {/* How to answer */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">How to Answer</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Think about the last 2 weeks (including today).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Choose one option for each statement.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Answer as honestly as you can - there are no right or wrong answers.
                    </li>
                  </ul>
                </div>

                {/* Response options legend */}
                <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Response Options</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Not at all</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">1</div>
                      <div className="text-sm text-muted-foreground">Several days</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">2</div>
                      <div className="text-sm text-muted-foreground">More than half the days</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Nearly every day</div>
                    </div>
                  </div>
                </div>

                {/* Before you begin */}
                <div className="bg-sage/10 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Heart className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Your pace:</strong> Takes 2-3 minutes</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  Start Questionnaire
                </Button>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Intro Screen - GAD-7 */}
            {screen === "intro" && isGAD7 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
                  GAD-7: A Gentle Check-In for Anxiety
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Generalized Anxiety Disorder-7 (GAD-7)
                </p>

                {/* About section */}
                <div className="bg-card rounded-2xl p-6 mb-6 text-left shadow-soft">
                  <p className="text-muted-foreground">
                    This short self-reflection tool helps you notice how often anxiety-related feelings 
                    and thoughts have been showing up in your life over the last 2 weeks.
                  </p>
                  <p className="text-muted-foreground mt-3 text-sm italic">
                    <strong>Important:</strong> This is not a diagnosis. It is a screening and reflection tool. 
                    If your results feel concerning, or if you are struggling to cope, consider reaching out 
                    to a mental health professional.
                  </p>
                </div>

                {/* How to answer */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">How to Answer</h3>
                  <p className="text-muted-foreground mb-3">
                    Over the last 2 weeks, how often have you been bothered by the following?
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Think about the last 2 weeks (including today).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Choose one option for each statement.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Answer as honestly as you can - there are no right or wrong answers.
                    </li>
                  </ul>
                </div>

                {/* Response options legend */}
                <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Response Options</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Not at all</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">1</div>
                      <div className="text-sm text-muted-foreground">Several days</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">2</div>
                      <div className="text-sm text-muted-foreground">More than half the days</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Nearly every day</div>
                    </div>
                  </div>
                </div>

                {/* Before you begin */}
                <div className="bg-sage/10 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Heart className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Your pace:</strong> Takes 1-2 minutes</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  Start Questionnaire
                </Button>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Intro Screen - PSS */}
            {screen === "intro" && isPSS && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
                  PSS — Perceived Stress Scale
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Gentle Check-In
                </p>

                {/* About section */}
                <div className="bg-card rounded-2xl p-6 mb-6 text-left shadow-soft">
                  <p className="text-muted-foreground">
                    This is a reflective tool to help you notice how stressful life has felt recently. 
                    It is not a diagnosis.
                  </p>
                </div>

                {/* How to answer */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">How to Answer</h3>
                  <p className="text-muted-foreground mb-3">
                    For each statement, choose how often it felt true for you <strong>in the last month</strong>.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Think about the last month (including today).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Choose one option for each statement.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Answer as honestly as you can - there are no right or wrong answers.
                    </li>
                  </ul>
                </div>

                {/* Response options legend */}
                <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Response Options</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">0</div>
                      <div className="text-sm text-muted-foreground">Never</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">1</div>
                      <div className="text-sm text-muted-foreground">Almost never</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">2</div>
                      <div className="text-sm text-muted-foreground">Sometimes</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">3</div>
                      <div className="text-sm text-muted-foreground">Fairly often</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">4</div>
                      <div className="text-sm text-muted-foreground">Very often</div>
                    </div>
                  </div>
                </div>

                {/* Before you begin */}
                <div className="bg-sage/10 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Heart className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Your pace:</strong> Takes 2-3 minutes</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  Start Questionnaire
                </Button>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Intro Screen - Other tools */}
            {screen === "intro" && !isStandardAssessment && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {tool.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {tool.description}
                </p>
                <p className="text-muted-foreground">
                  This assessment flow is coming soon.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/tools")}>
                  Back to Tools
                </Button>
              </div>
            )}

            {/* Quiz Screen - All questions on one page */}
            {screen === "quiz" && isPHQ9 && (
              <div>
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                  <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-2">
                    PHQ-9: Gentle Check-In
                  </h1>
                  <p className="text-muted-foreground">
                    Over the last 2 weeks, how often have you been bothered by these?
                  </p>
                </div>

                {/* Response legend - compact */}
                <div className="bg-muted rounded-xl p-4 mb-6">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <span><strong className="text-primary">0</strong> = Not at all</span>
                    <span><strong className="text-primary">1</strong> = Several days</span>
                    <span><strong className="text-primary">2</strong> = More than half</span>
                    <span><strong className="text-primary">3</strong> = Nearly every day</span>
                  </div>
                </div>

                {/* Questions */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
                  {PHQ9_QUESTIONS.map((question, index) => (
                    <PHQ9QuestionRow
                      key={index}
                      questionNumber={index + 1}
                      questionText={question}
                      selectedValue={answers[index] ?? null}
                      onSelect={(value) => handleSelect(index, value)}
                      isLastQuestion={index === 8}
                    />
                  ))}
                </div>

                {/* Scoring popup link */}
                <div className="flex justify-center mb-6">
                  <PHQ9ScoringDialog />
                </div>

                {/* Submit button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => setScreen("intro")}>
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                  >
                    View My Results
                  </Button>
                </div>

                {!allQuestionsAnswered && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Please answer all 9 questions to see your results
                  </p>
                )}

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Quiz Screen - GAD-7 */}
            {screen === "quiz" && isGAD7 && (
              <div>
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                  <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-2">
                    GAD-7: Gentle Check-In for Anxiety
                  </h1>
                  <p className="text-muted-foreground">
                    Over the last 2 weeks, how often have you been bothered by these?
                  </p>
                </div>

                {/* Response legend - compact */}
                <div className="bg-muted rounded-xl p-4 mb-6">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <span><strong className="text-primary">0</strong> = Not at all</span>
                    <span><strong className="text-primary">1</strong> = Several days</span>
                    <span><strong className="text-primary">2</strong> = More than half</span>
                    <span><strong className="text-primary">3</strong> = Nearly every day</span>
                  </div>
                </div>

                {/* Questions */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
                  {GAD7_QUESTIONS.map((question, index) => (
                    <PHQ9QuestionRow
                      key={index}
                      questionNumber={index + 1}
                      questionText={question}
                      selectedValue={answers[index] ?? null}
                      onSelect={(value) => handleSelect(index, value)}
                      isLastQuestion={false}
                    />
                  ))}
                </div>

                {/* Scoring popup link */}
                <div className="flex justify-center mb-6">
                  <GAD7ScoringDialog />
                </div>

                {/* Submit button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => setScreen("intro")}>
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                  >
                    View My Results
                  </Button>
                </div>

                {!allQuestionsAnswered && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Please answer all 7 questions to see your results
                  </p>
                )}

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Quiz Screen - PSS */}
            {screen === "quiz" && isPSS && (
              <div>
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Soulful Reflections</p>
                  <h1 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-2">
                    PSS: Perceived Stress Scale
                  </h1>
                  <p className="text-muted-foreground">
                    Over the last month, how often have you felt the following?
                  </p>
                </div>

                {/* Response legend - compact */}
                <div className="bg-muted rounded-xl p-4 mb-6">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                    <span><strong className="text-primary">0</strong> = Never</span>
                    <span><strong className="text-primary">1</strong> = Almost never</span>
                    <span><strong className="text-primary">2</strong> = Sometimes</span>
                    <span><strong className="text-primary">3</strong> = Fairly often</span>
                    <span><strong className="text-primary">4</strong> = Very often</span>
                  </div>
                </div>

                {/* Reverse scoring note */}
                <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mb-6 text-sm">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> Items marked as "(positive item)" are reverse-scored automatically in the final calculation.
                  </p>
                </div>

                {/* Questions */}
                <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft mb-6">
                  {PSS_QUESTIONS.map((question, index) => (
                    <PSSQuestionRow
                      key={index}
                      questionNumber={index + 1}
                      questionText={question.text}
                      selectedValue={answers[index] ?? null}
                      onSelect={(value) => handleSelect(index, value)}
                      isPositiveItem={question.isPositive}
                    />
                  ))}
                </div>

                {/* Scoring popup link */}
                <div className="flex justify-center mb-6">
                  <PSSScoringDialog />
                </div>

                {/* Submit button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" onClick={() => setScreen("intro")}>
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered}
                  >
                    View My Results
                  </Button>
                </div>

                {!allQuestionsAnswered && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Please answer all 10 questions to see your results
                  </p>
                )}

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Results Screen */}
            {screen === "results" && isPHQ9 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  Your Reflection Results
                </h1>
                <p className="text-muted-foreground mb-8">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Your responses are private and stored only on your device
                </p>

                {/* Score display */}
                <div className="bg-card rounded-2xl p-6 mb-6 shadow-soft">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-primary mb-2">{totalScore}</div>
                    <div className="text-sm text-muted-foreground">out of 27</div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-3">
                      <span className="font-semibold text-primary">{scoreInterpretation.title}</span>
                    </div>
                    <p className="text-muted-foreground">{scoreInterpretation.description}</p>
                  </div>
                </div>

                {/* Soulful Reflection */}
                <div className="bg-sage/10 border border-sage/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sage" />
                    Soulful Reflection
                  </h3>
                  <p className="text-muted-foreground italic">{scoreInterpretation.reflection}</p>
                </div>

                {/* Question 9 Warning if flagged */}
                {question9Flagged && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-6 text-left">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Important Notice About Question 9</h3>
                        <p className="text-sm text-muted-foreground">
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
                        <h3 className="font-semibold text-foreground mb-2">Support Resources</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your responses, we want to make sure you have access to support:
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
                <div className="bg-blush/30 border border-primary/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2">A Gentle Reminder</h3>
                  <p className="text-muted-foreground">
                    Mental health exists on a spectrum. Needing help is not a weakness - it is wisdom. 
                    If your score suggests moderate to severe symptoms, reaching out early can change the course of your journey.
                  </p>
                </div>

                {/* Save Results Option */}
                {!showEmailCapture ? (
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground mb-1">Save Your Results</h3>
                        <p className="text-sm text-muted-foreground">
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
                  <form onSubmit={handleEmailSubmit} className="bg-card border border-border rounded-2xl p-6 mb-6 text-left">
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
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-4">You May Find These Helpful</h3>
                  <div className="grid gap-3">
                    <Link 
                      to="/articles" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Explore related articles</span>
                    </Link>
                    <Link 
                      to="/media" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Listen to audio reflections</span>
                    </Link>
                    <Link 
                      to="/tools" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Try other self-reflection tools</span>
                    </Link>
                  </div>
                </div>

                {/* Scoring Guide Link */}
                <div className="flex justify-center mb-6">
                  <PHQ9ScoringDialog />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="outline" onClick={handleRetake}>
                    Take Again
                  </Button>
                  <Button variant="hero" onClick={() => navigate("/tools")}>
                    Explore Other Tools
                  </Button>
                </div>

                <CrisisBox />
              </div>
            )}

            {/* Results Screen - GAD-7 */}
            {screen === "results" && isGAD7 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  Your Reflection Results
                </h1>
                <p className="text-muted-foreground mb-8">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Your responses are private and stored only on your device
                </p>

                {/* Score display */}
                <div className="bg-card rounded-2xl p-6 mb-6 shadow-soft">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-primary mb-2">{totalScore}</div>
                    <div className="text-sm text-muted-foreground">out of 21</div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-3">
                      <span className="font-semibold text-primary">{scoreInterpretation.title}</span>
                    </div>
                    <p className="text-muted-foreground">{scoreInterpretation.description}</p>
                  </div>
                </div>

                {/* Soulful Reflection */}
                <div className="bg-sage/10 border border-sage/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sage" />
                    Soulful Reflection
                  </h3>
                  <p className="text-muted-foreground italic">{scoreInterpretation.reflection}</p>
                </div>

                {/* Crisis resources if needed (severe anxiety) */}
                {showCrisisResources && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">If You Feel Unsafe</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          If you are having thoughts of harming yourself, feel unable to stay safe, or feel in immediate danger, 
                          seek urgent help from local emergency services or the nearest hospital, or reach out to someone you trust right now.
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
                <div className="bg-blush/30 border border-primary/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2">A Gentle Reminder</h3>
                  <p className="text-muted-foreground">
                    Mental health exists on a spectrum. Needing help is not a weakness - it is wisdom. 
                    If your score suggests moderate to severe symptoms, reaching out early can change the course of your journey.
                  </p>
                </div>

                {/* Save Results Option */}
                {!showEmailCapture ? (
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground mb-1">Save Your Results</h3>
                        <p className="text-sm text-muted-foreground">
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
                  <form onSubmit={handleEmailSubmit} className="bg-card border border-border rounded-2xl p-6 mb-6 text-left">
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
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-4">You May Find These Helpful</h3>
                  <div className="grid gap-3">
                    <Link 
                      to="/articles" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Explore related articles</span>
                    </Link>
                    <Link 
                      to="/media" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Listen to audio reflections</span>
                    </Link>
                    <Link 
                      to="/tools" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Try other self-reflection tools</span>
                    </Link>
                  </div>
                </div>

                {/* Scoring Guide Link */}
                <div className="flex justify-center mb-6">
                  <GAD7ScoringDialog />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="outline" onClick={handleRetake}>
                    Take Again
                  </Button>
                  <Button variant="hero" onClick={() => navigate("/tools")}>
                    Explore Other Tools
                  </Button>
                </div>

                <CrisisBox />
              </div>
            )}

            {/* Results Screen - PSS */}
            {screen === "results" && isPSS && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  Your Reflection Results
                </h1>
                <p className="text-muted-foreground mb-8">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Your responses are private and stored only on your device
                </p>

                {/* Score display */}
                <div className="bg-card rounded-2xl p-6 mb-6 shadow-soft">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-primary mb-2">{totalScore}</div>
                    <div className="text-sm text-muted-foreground">out of 40</div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-3">
                      <span className="font-semibold text-primary">{scoreInterpretation.title}</span>
                    </div>
                    <p className="text-muted-foreground">{scoreInterpretation.description}</p>
                  </div>
                </div>

                {/* Soulful Reflection */}
                <div className="bg-sage/10 border border-sage/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-sage" />
                    Soulful Reflection
                  </h3>
                  <p className="text-muted-foreground italic">{scoreInterpretation.reflection}</p>
                </div>

                {/* Crisis resources if needed (high stress) */}
                {showCrisisResources && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">A Safety Note</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          If stress is accompanied by panic, hopelessness, thoughts of self-harm, or you feel unsafe, 
                          please seek urgent support from local emergency services or a trusted person nearby.
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
                <div className="bg-blush/30 border border-primary/20 rounded-2xl p-6 mb-6 text-left">
                  <h3 className="font-semibold text-foreground mb-2">A Gentle Reminder</h3>
                  <p className="text-muted-foreground">
                    The PSS helps you understand how stressful your life has felt recently. It is not a diagnosis, 
                    but a mirror for self-awareness. If stress feels overwhelming, reaching out for support is a sign of wisdom.
                  </p>
                </div>

                {/* Save Results Option */}
                {!showEmailCapture ? (
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground mb-1">Save Your Results</h3>
                        <p className="text-sm text-muted-foreground">
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
                  <form onSubmit={handleEmailSubmit} className="bg-card border border-border rounded-2xl p-6 mb-6 text-left">
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
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-4">You May Find These Helpful</h3>
                  <div className="grid gap-3">
                    <Link 
                      to="/articles" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Explore related articles</span>
                    </Link>
                    <Link 
                      to="/media" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Listen to audio reflections</span>
                    </Link>
                    <Link 
                      to="/tools" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Try other self-reflection tools</span>
                    </Link>
                  </div>
                </div>

                {/* Scoring Guide Link */}
                <div className="flex justify-center mb-6">
                  <PSSScoringDialog />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="outline" onClick={handleRetake}>
                    Take Again
                  </Button>
                  <Button variant="hero" onClick={() => navigate("/tools")}>
                    Explore Other Tools
                  </Button>
                </div>

                <CrisisBox />
              </div>
            )}

            {/* Non-standard tools - keep original flow */}
            {screen === "quiz" && !isStandardAssessment && (
              <div className="text-center">
                <p className="text-muted-foreground">
                  This assessment flow is coming soon for {tool.title}.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/tools")}>
                  Back to Tools
                </Button>
              </div>
            )}

            {screen === "results" && !isStandardAssessment && (
              <div className="text-center">
                <p className="text-muted-foreground">
                  Results coming soon for {tool.title}.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/tools")}>
                  Back to Tools
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolAssessment;
