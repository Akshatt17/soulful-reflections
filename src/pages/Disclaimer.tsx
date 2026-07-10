import PageLayout from "@/components/PageLayout";
import { AlertTriangle, Info } from "lucide-react";

const Disclaimer = () => (
  <PageLayout>
    {/* Hero Section */}
    <section className="py-16">
      <div className="container-custom radial-tint px-4 py-6 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
          Medical Disclaimer
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Important information about the nature of our content and services.
        </p>
      </div>
    </section>

    {/* Disclaimer Content */}
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* Important Notice */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-3">
                    Not Medical Advice
                  </h2>
                  <p className="text-foreground/80">
                    The content on this website is for informational and educational purposes only. 
                    It is not intended to be a substitute for professional medical advice, diagnosis, 
                    or treatment. Always seek the advice of your physician or other qualified health 
                    provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Self-Assessment Tools
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p className="mb-4">
                  Our self-assessment tools are designed for self-reflection and personal insight. 
                  They are <strong>not diagnostic instruments</strong> and should not be used as a 
                  basis for medical decisions.
                </p>
                <ul className="space-y-2">
                  <li>Results are for educational purposes only</li>
                  <li>They do not constitute a professional evaluation</li>
                  <li>They should not replace consultation with a licensed professional</li>
                  <li>Individual experiences may vary significantly</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Content & Articles
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p className="mb-4">
                  The articles, guides, and resources provided on this site are meant to offer 
                  general information and support for personal growth and well-being.
                </p>
                <ul className="space-y-2">
                  <li>Content is based on research and professional experience</li>
                  <li>Information may not apply to your specific situation</li>
                  <li>We recommend consulting professionals for personalized advice</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Professional Help
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p className="mb-4">
                  If you are experiencing significant distress, mental health concerns, or are in 
                  crisis, please seek help from a qualified mental health professional immediately.
                </p>
                <p>
                  This website does not provide therapy, counseling, or any other mental health services.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Limitation of Liability
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p>
                  The Velvet Mind and its creators are not liable for any damages or negative 
                  consequences arising from the use of information provided on this website. 
                  Use of this site is at your own risk.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground/60 mt-8 text-center">
            Last updated: December 2024
          </p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Disclaimer;