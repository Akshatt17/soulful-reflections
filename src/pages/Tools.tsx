import PageLayout from "@/components/PageLayout";
import ToolCard from "@/components/ToolCard";
import CrisisBox from "@/components/CrisisBox";
import { Shield, Eye, Heart } from "lucide-react";
import toolsData from "@/data/tools.json";

const Tools = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
            Self-Assessment Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore our collection of thoughtfully designed tools to support your 
            journey of self-discovery and personal growth.
          </p>
          {/* Disclaimer badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm text-muted-foreground shadow-soft">
            <Shield className="w-4 h-4 text-sage" />
            <span>These tools are for self-reflection only — not diagnostic instruments</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {toolsData.tools.map((tool) => (
              <ToolCard
                key={tool.id}
                id={tool.id}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                duration="2-3 min"
              />
            ))}
          </div>

          {/* Informational Block */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-6 text-center">
                How Our Tools Work
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-sage" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Anonymous</h4>
                  <p className="text-sm text-muted-foreground">
                    Your responses stay on your device. We don't track or store personal data.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-sage" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Non-Diagnostic</h4>
                  <p className="text-sm text-muted-foreground">
                    Results are for reflection only and should not replace professional guidance.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-sage" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Optional Follow-Up</h4>
                  <p className="text-sm text-muted-foreground">
                    Save your email later to receive personalized resources (coming soon).
                  </p>
                </div>
              </div>
            </div>
            <CrisisBox />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tools;
