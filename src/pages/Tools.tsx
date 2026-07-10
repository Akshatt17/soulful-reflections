import PageLayout from "@/components/PageLayout";
import ToolCard from "@/components/ToolCard";
import CrisisBox from "@/components/CrisisBox";
import { Shield, Eye, Heart } from "lucide-react";
import toolsData from "@/data/tools.json";

const Tools = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <div className="radial-tint mx-auto max-w-2xl py-6">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
              Self-Assessment Tools
            </h1>
            <p className="text-lg text-foreground/80 mb-6">
              Explore our collection of thoughtfully designed tools to support your
              journey of self-discovery and personal growth.
            </p>
            {/* Disclaimer badge */}
            <div className="glass-panel inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-foreground/75">
              <Shield className="w-4 h-4 text-forest" />
              <span>These tools are for self-reflection only — not diagnostic instruments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding">
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
            <div className="glass-panel p-8 mb-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-6 text-center">
                How Our Tools Work
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/25 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-forest" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Anonymous</h4>
                  <p className="text-sm text-foreground/75">
                    Your responses stay on your device. We don't track or store personal data.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/25 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-forest" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Non-Diagnostic</h4>
                  <p className="text-sm text-foreground/75">
                    Results are for reflection only and should not replace professional guidance.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sage/25 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-forest" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Optional Follow-Up</h4>
                  <p className="text-sm text-foreground/75">
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
