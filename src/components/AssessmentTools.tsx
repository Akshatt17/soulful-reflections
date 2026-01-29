import { Heart, Brain, Scale, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: Heart,
    id: "phq9",
    title: "PHQ-9 Self-Reflection Questionnaire",
    description: "A brief set of questions to help you reflect on how you've been feeling emotionally over the past two weeks.",
    link: "Begin Reflection →",
  },
  {
    icon: Brain,
    id: "gad7",
    title: "GAD-7: A Gentle Check-In for Anxiety",
    description: "A short self-reflection tool to help you notice how often anxiety-related feelings and thoughts have been showing up.",
    link: "Begin Reflection →",
  },
  {
    icon: Activity,
    id: "pss",
    title: "PSS — Perceived Stress Scale",
    description: "A reflective tool to help you notice how stressful life has felt recently over the last month.",
    link: "Begin Reflection →",
  },
  {
    icon: Scale,
    id: "balance-check",
    title: "Balance Check",
    description: "Assess the harmony between different areas of your life and find opportunities for creating better equilibrium.",
    link: "Begin Assessment →",
  },
];

const AssessmentTools = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Self-Assessment Tools
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our collection of thoughtfully designed tools to support your journey of self-discovery.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.title}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-sage/20 rounded-full flex items-center justify-center mb-6">
                <tool.icon className="w-7 h-7 text-sage" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-primary mb-3">
                {tool.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {tool.description}
              </p>

              {/* Link */}
              <Link
                to={`/tools/${tool.id}`}
                className="text-primary font-medium hover:underline underline-offset-4 transition-all duration-200"
              >
                {tool.link}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessmentTools;
