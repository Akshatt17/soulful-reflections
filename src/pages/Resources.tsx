import PageLayout from "@/components/PageLayout";
import CrisisBox from "@/components/CrisisBox";
import { Download, ExternalLink } from "lucide-react";
import resourcesData from "@/data/resources.json";

const Resources = () => {
  return (
    <PageLayout>
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Downloadable tools and external resources to support your journey.</p>
        </div>
      </section>
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">Downloadable Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {resourcesData.downloads.map((item) => (
              <div key={item.id} className="bg-background rounded-xl p-6 border border-border">
                <span className="text-xs font-semibold text-sage uppercase">{item.category}</span>
                <h3 className="font-serif text-lg font-bold text-primary mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.type} • {item.size}</span>
                  <a href={item.downloadUrl} className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">External Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {resourcesData.externalResources.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                <span className="text-xs font-semibold text-sage uppercase">{item.category}</span>
                <h3 className="font-serif text-lg font-bold text-primary mt-2 mb-2 flex items-center gap-2">{item.title} <ExternalLink className="w-4 h-4" /></h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </a>
            ))}
          </div>
          <CrisisBox />
        </div>
      </section>
    </PageLayout>
  );
};
export default Resources;
