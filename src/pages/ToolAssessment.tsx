import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ProgressBar from "@/components/ProgressBar";
import QuizStep from "@/components/QuizStep";
import CrisisBox from "@/components/CrisisBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle, Mail, Eye, Lock, BookOpen, Wrench, AlertTriangle, Clock, Shield, Heart } from "lucide-react";
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

  // Check if crisis resources should be shown based on high score or question 9 answered positively
  const showCrisisResources = useMemo(() => {
    // For PHQ-9, show crisis resources if question 9 (thoughts of self-harm) was answered > 0
    if (tool.id === "phq9" && answers[8] > 0) {
      return true;
    }
    // Also show if score is in high range
    return totalScore >= tool.results.high.range[0];
  }, [tool.id, answers, totalScore, tool.results.high.range]);

  const handleStart = () => setScreen("quiz");

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion === tool.questions.length - 1) {
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

  const isPHQ9 = tool.id === "phq9";

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

                {/* Tool explanation */}
                <div className="bg-card rounded-2xl p-6 mb-6 text-left shadow-soft">
                  <h3 className="font-semibold text-foreground mb-3">
                    {isPHQ9 ? "About This Questionnaire" : "What This Helps With"}
                  </h3>
                  <p className="text-muted-foreground">
                    {tool.disclaimer}
                  </p>
                </div>

                {/* Before you begin - bullet points */}
                <div className="bg-muted rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-3">Before You Begin</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Anonymous:</strong> Your responses stay on your device only</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Heart className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Non-diagnostic:</strong> This is for self-reflection, not clinical assessment</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-sage" />
                      </span>
                      <span><strong>Your pace:</strong> Takes 2-3 minutes, and you can stop anytime</span>
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="lg" onClick={handleStart}>
                  {isPHQ9 ? "Start Questionnaire" : "Start Assessment"}
                </Button>

                <div className="mt-8">
                  <CrisisBox />
                </div>
              </div>
            )}

            {/* Quiz Screen */}
            {screen === "quiz" && (
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-gradient-to-br from-blush/30 via-background to-sage/10 rounded-3xl pointer-events-none" />
                
                <div className="relative space-y-8">
                  <ProgressBar
                    current={currentQuestion + 1}
                    total={tool.questions.length}
                  />
                  <QuizStep
                    question={tool.questions[currentQuestion].question}
                    context={(tool.questions[currentQuestion] as { context?: string }).context}
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

            {/* Screen: Results Gate */}
            {screen === "results-gate" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                  Thank You for Taking a Moment to Reflect
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
                          Get detailed insights and keep a record for yourself.
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

            {/* Screen: Brief Results Summary (Anonymous) */}
            {screen === "brief-summary" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-sage" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                  Your Reflection Summary
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                  <Lock className="w-4 h-4 inline mr-1" />
                  This summary is anonymous and not stored
                </p>

                {/* High-level insight - supportive language, no scores */}
                <div className="bg-card rounded-2xl p-8 mb-8 text-left shadow-soft">
                  <p className="text-lg text-foreground leading-relaxed">
                    {result.message}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    This is not a diagnosis. If you're feeling overwhelmed or distressed, please consider reaching out to a mental health professional.
                  </p>
                </div>

                {/* Crisis resources if needed */}
                {showCrisisResources && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">We Care About Your Well-being</h3>
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

                {/* Suggested next steps */}
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

            {/* Screen: Email Capture */}
            {screen === "email-capture" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-primary" />
                </div>

                <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                  Receive Your Full Results
                </h1>
                <p className="text-muted-foreground mb-8">
                  Enter your email to receive a detailed breakdown of your results 
                  and personalized recommendations.
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

            {/* Screen: Full Results */}
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

                {/* Score information - for full results only */}
                {isPHQ9 && (
                  <div className="bg-muted/50 border border-border rounded-2xl p-6 text-left mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Your Score: {totalScore} out of 27</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This score is for informational purposes only and does not constitute a diagnosis.
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>0-4:</strong> Minimal emotional strain</p>
                      <p><strong>5-9:</strong> Mild emotional strain</p>
                      <p><strong>10-14:</strong> Moderate emotional strain</p>
                      <p><strong>15-19:</strong> Moderately severe emotional strain</p>
                      <p><strong>20-27:</strong> Severe emotional strain</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      If your score suggests significant distress, please consider speaking with a mental health professional.
                    </p>
                  </div>
                )}

                {/* Breakdown / Recommendations */}
                <div className="bg-muted rounded-2xl p-6 text-left mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Personalized Recommendations</h3>
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
                      <span className="text-foreground">Try other self-reflection tools</span>
                    </Link>
                  </div>
                </div>

                {/* Crisis Resources (conditionally shown) */}
                {showCrisisResources && (
                  <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 text-left mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Important Support Resources</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your responses, we want to make sure you have access to additional support. Please know that help is available:
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
