import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProgressBar from "@/components/ProgressBar";
import QuizStep from "@/components/QuizStep";
import CrisisBox from "@/components/CrisisBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle, Mail, Eye, Lock, BookOpen, Wrench, AlertTriangle } from "lucide-react";
import toolsData from "@/data/tools.json";

type Screen = "intro" | "quiz" | "results-gate" | "brief-summary" | "email-capture" | "full-results";

const ToolAssessment = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = toolsData.tools.find((t) => t.id === toolId);

  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);

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

  // Check if crisis resources should be shown (high score)
  const showCrisisResources = totalScore >= tool.results.high.range[0];

  const handleStart = () => setScreen("quiz");

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion === tool.questions.length - 1) {
      // Go to results gate instead of showing results directly
      setScreen("results-gate");
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const handleViewBriefSummary = () => {
    setScreen("brief-summary");
  };

  const handleSaveResults = () => {
    setScreen("email-capture");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) {
      // Save to localStorage with email
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
      setScreen("full-results");
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setEmail("");
    setName("");
    setConsent(false);
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

                {/* What this helps with */}
                <div className="bg-card rounded-2xl p-6 mb-6 text-left shadow-soft">
                  <h3 className="font-semibold text-foreground mb-3">What This Helps With</h3>
                  <p className="text-muted-foreground">
                    This self-reflection tool helps you gain insights into your current emotional state, 
                    identify patterns, and discover personalized resources to support your well-being journey.
                  </p>
                </div>

                {/* Before you begin - bullet points */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-sage rounded-full"></span>
                      </span>
                      <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-sage rounded-full"></span>
                      </span>
                      <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-sage rounded-full"></span>
                      </span>
                      <span><strong>Your pace:</strong> Take about 2-3 minutes, and you can stop anytime</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  Start Assessment
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
                    onExit={() => navigate("/tools")}
                    isFirst={currentQuestion === 0}
                    isLast={currentQuestion === tool.questions.length - 1}
                  />
                </div>
              </div>
            )}

            {/* Screen 8: Results Gate */}
            {screen === "results-gate" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                  Your Responses Are Ready
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Choose how you'd like to view your results
                </p>

                <div className="grid gap-4 max-w-md mx-auto">
                  {/* Option A: Brief Summary */}
                  <button
                    onClick={handleViewBriefSummary}
                    className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Eye className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">View Brief Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          Get a quick overview of your results. No data is stored.
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Option B: Save & Full Results */}
                  <button
                    onClick={handleSaveResults}
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-left hover:bg-primary/10 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Save & Receive Full Results</h3>
                        <p className="text-sm text-muted-foreground">
                          Get detailed insights and personalized recommendations via email.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Screen 9: Brief Results Summary (Anonymous) */}
            {screen === "brief-summary" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  Your Brief Summary
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                  <Lock className="w-4 h-4 inline mr-1" />
                  This summary is anonymous and not stored
                </p>

                {/* High-level insight - neutral language, no scores */}
                <div className="bg-card rounded-2xl p-8 mb-8 text-left shadow-soft">
                  <p className="text-lg text-foreground leading-relaxed">
                    {result.message}
                  </p>
                </div>

                {/* Suggested next steps */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-4">Suggested Next Steps</h3>
                  <div className="grid gap-3">
                    <Link 
                      to="/articles" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Explore related articles</span>
                    </Link>
                    <Link 
                      to="/tools" 
                      className="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Try other self-assessment tools</span>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="outline" onClick={handleRetake}>
                    Take Again
                  </Button>
                  <Button variant="hero" onClick={handleSaveResults}>
                    Get Full Results via Email
                  </Button>
                </div>

                <CrisisBox />
              </div>
            )}

            {/* Screen 10: Email Capture */}
            {screen === "email-capture" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                  Receive Your Full Results
                </h1>
                <p className="text-muted-foreground mb-8">
                  Enter your email to receive a detailed breakdown of your results, 
                  personalized recommendations, and suggested resources.
                </p>

                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto text-left">
                  <div className="space-y-4 mb-6">
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
                        className="w-full"
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
                        className="w-full"
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
                        <Link to="/privacy" className="text-primary hover:underline ml-1">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={!email || !consent}
                  >
                    View My Results
                  </Button>

                  <button
                    type="button"
                    onClick={handleViewBriefSummary}
                    className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Skip and view brief summary instead
                  </button>
                </form>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Screen 11: Full Results */}
            {screen === "full-results" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  {result.title}
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                  Your results have been saved {name ? `for ${name}` : ""}
                </p>

                {/* Summary Section */}
                <div className="bg-card rounded-2xl p-8 mb-6 text-left shadow-soft">
                  <h3 className="font-semibold text-foreground mb-3">Summary</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {result.message}
                  </p>
                </div>

                {/* Breakdown / Explanation */}
                <div className="bg-muted rounded-2xl p-6 text-left mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Detailed Recommendations</h3>
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

                {/* Suggested Content */}
                <div className="bg-card border border-border rounded-2xl p-6 text-left mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Suggested Resources</h3>
                  <div className="grid gap-3">
                    <Link 
                      to="/articles" 
                      className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Browse articles on related topics</span>
                    </Link>
                    <Link 
                      to="/media" 
                      className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Eye className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Explore guided meditations</span>
                    </Link>
                    <Link 
                      to="/tools" 
                      className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Try other assessment tools</span>
                    </Link>
                  </div>
                </div>

                {/* Crisis Resources (conditionally shown) */}
                {showCrisisResources && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Important Resources</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your responses, we want to make sure you have access to additional support:
                        </p>
                        <div className="space-y-2 text-sm">
                          <a href="tel:988" className="block text-primary font-medium hover:underline">
                            988 Suicide & Crisis Lifeline
                          </a>
                          <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="block text-primary font-medium hover:underline">
                            Crisis Text Line - Text HOME to 741741
                          </a>
                          <Link to="/resources" className="block text-primary font-medium hover:underline">
                            View All Crisis Resources
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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