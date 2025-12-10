import PageLayout from "@/components/PageLayout";
import ToolCard from "@/components/ToolCard";
import CrisisBox from "@/components/CrisisBox";
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of thoughtfully designed tools to support your 
            journey of self-discovery and personal growth.
          </p>
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
              />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-muted rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-foreground mb-2">Important Note</h3>
              <p className="text-sm text-muted-foreground">
                These self-assessment tools are designed for self-reflection and personal 
                growth purposes only. They are not diagnostic instruments and should not 
                replace professional mental health evaluation or treatment. If you're 
                experiencing significant distress, please consult a qualified healthcare provider.
              </p>
            </div>
            <CrisisBox />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Tools;
