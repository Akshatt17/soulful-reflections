import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Assessment components and utilities
import { IntroScreen, QuizScreen, ResultsScreen } from "@/components/assessment";
import { 
  getAssessment, 
  hasAssessment, 
  getAssessmentResult 
} from "@/data/assessments";

type Screen = "intro" | "quiz" | "results";

const ToolAssessment = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();

  // Get the assessment configuration
  const config = toolId ? getAssessment(toolId) : undefined;

  // State
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  // Tool not found or not supported
  if (!toolId || !hasAssessment(toolId) || !config) {
    return (
      <PageLayout>
        <div className="section-padding text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Tool Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            {toolId && !hasAssessment(toolId) 
              ? "This assessment is coming soon." 
              : "The assessment you're looking for doesn't exist."
            }
          </p>
          <Link to="/tools">
            <Button variant="hero">Back to Tools</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get assessment result (handles standard and custom scoring like MDQ)
  const assessmentResult = useMemo(() => {
    return getAssessmentResult(answers, config);
  }, [answers, config]);

  const { totalScore, displayMax, interpretation: scoreInterpretation, showCrisis: showCrisisResources } = assessmentResult;

  // Check if all questions are answered
  const allQuestionsAnswered = useMemo(() => {
    return Object.keys(answers).length === config.questionCount;
  }, [answers, config.questionCount]);

  // Check if question 9 was flagged (for PHQ-9)
  const question9Flagged = useMemo(() => {
    if (config.crisis.flaggedQuestionIndex === undefined) return false;
    const flaggedAnswer = answers[config.crisis.flaggedQuestionIndex];
    return flaggedAnswer !== undefined && flaggedAnswer > 0;
  }, [answers, config.crisis.flaggedQuestionIndex]);

  // Handlers
  const handleStart = () => setScreen("quiz");

  const handleSelect = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setScreen("results");
    }
  };

  const handleBack = () => setScreen("intro");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      const resultData = {
        toolId: config.id,
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

            {/* Intro Screen */}
            {screen === "intro" && (
              <IntroScreen config={config} onStart={handleStart} />
            )}

            {/* Quiz Screen */}
            {screen === "quiz" && (
              <QuizScreen
                config={config}
                answers={answers}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
                onBack={handleBack}
                allQuestionsAnswered={allQuestionsAnswered}
              />
            )}

            {/* Results Screen */}
            {screen === "results" && (
              <ResultsScreen
                config={config}
                totalScore={totalScore}
                displayMax={displayMax}
                scoreInterpretation={scoreInterpretation}
                showCrisisResources={showCrisisResources}
                showQuestion9Warning={question9Flagged}
                answers={answers}
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName}
                consent={consent}
                setConsent={setConsent}
                showEmailCapture={showEmailCapture}
                setShowEmailCapture={setShowEmailCapture}
                onEmailSubmit={handleEmailSubmit}
                onRetake={handleRetake}
              />
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolAssessment;
