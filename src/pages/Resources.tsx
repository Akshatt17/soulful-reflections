import PageLayout from "@/components/PageLayout";
import CrisisBox from "@/components/CrisisBox";
import { Download, ExternalLink } from "lucide-react";
import resourcesData from "@/data/resources.json";

const Resources = () => {
  return (
    <PageLayout>
      <section className="py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <div className="radial-tint mx-auto max-w-2xl py-6">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">Resources</h1>
            <p className="text-lg text-foreground/80">Downloadable tools and external resources to support your journey.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <h2 className="radial-tint inline-block font-serif text-2xl font-bold text-primary mb-8 px-4 py-2">Downloadable Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {resourcesData.downloads.map((item) => (
              <div key={item.id} className="glass-panel glass-panel-hover p-6">
                <span className="text-xs font-semibold text-forest uppercase">{item.category}</span>
                <h3 className="font-serif text-lg font-bold text-primary mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/60">{item.type} • {item.size}</span>
                  <a href={item.downloadUrl} className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
          <h2 className="radial-tint inline-block font-serif text-2xl font-bold text-primary mb-8 px-4 py-2">External Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {resourcesData.externalResources.map((item) => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="glass-panel glass-panel-hover p-6">
                <span className="text-xs font-semibold text-forest uppercase">{item.category}</span>
                <h3 className="font-serif text-lg font-bold text-primary mt-2 mb-2 flex items-center gap-2">{item.title} <ExternalLink className="w-4 h-4" /></h3>
                <p className="text-sm text-foreground/80">{item.description}</p>
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
