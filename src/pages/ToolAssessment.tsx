import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProgressBar from "@/components/ProgressBar";
import QuizStep from "@/components/QuizStep";
import CrisisBox from "@/components/CrisisBox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import toolsData from "@/data/tools.json";

type Screen = "intro" | "quiz" | "results";

const ToolAssessment = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = toolsData.tools.find((t) => t.id === toolId);

  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

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

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  }, [answers]);

  const result = useMemo(() => {
    const { results } = tool;
    if (totalScore >= results.high.range[0] && totalScore <= results.high.range[1]) {
      return results.high;
    } else if (totalScore >= results.moderate.range[0] && totalScore <= results.moderate.range[1]) {
      return results.moderate;
    }
    return results.low;
  }, [totalScore, tool]);

  const handleStart = () => setScreen("quiz");

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion === tool.questions.length - 1) {
      // Save to localStorage
      const resultData = {
        toolId: tool.id,
        score: totalScore,
        date: new Date().toISOString(),
        answers,
      };
      const stored = localStorage.getItem("assessmentResults");
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem("assessmentResults", JSON.stringify([...existing, resultData]));
      setScreen("results");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setScreen("intro");
  };

  return (
    <PageLayout>
      <section className="section-padding bg-background min-h-[70vh]">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
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
              <div className="text-center">
                <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary mb-4">
                  {tool.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {tool.description}
                </p>

                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-2">Before You Begin</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.disclaimer}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• This assessment takes about 2-3 minutes</li>
                    <li>• Answer based on how you've felt recently</li>
                    <li>• There are no right or wrong answers</li>
                    <li>• Your responses are stored only on your device</li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  Begin Assessment
                </Button>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Quiz Screen */}
            {screen === "quiz" && (
              <div>
                <ProgressBar
                  current={currentQuestion + 1}
                  total={tool.questions.length}
                />
                <div className="mt-8">
                  <QuizStep
                    question={tool.questions[currentQuestion].question}
                    options={tool.questions[currentQuestion].options}
                    selectedValue={answers[currentQuestion] ?? null}
                    onSelect={handleSelect}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    isFirst={currentQuestion === 0}
                    isLast={currentQuestion === tool.questions.length - 1}
                  />
                </div>
              </div>
            )}

            {/* Results Screen */}
            {screen === "results" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  {result.title}
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Your score: {totalScore} / {tool.questions.length * 5}
                </p>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {result.message}
                </p>

                <div className="bg-muted rounded-2xl p-6 text-left mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Recommendations</h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary font-semibold">
                          {i + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
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
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ToolAssessment;
