import PageLayout from "@/components/PageLayout";
import { Phone, MessageCircle, Globe, AlertTriangle, Heart } from "lucide-react";

const Crisis = () => (
  <PageLayout>
    {/* Hero Section */}
    <section className="py-16">
      <div className="container-custom radial-tint px-4 py-6 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
          Crisis Resources
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          If you or someone you know is in crisis, please reach out for help. You are not alone.
        </p>
      </div>
    </section>

    {/* Emergency Contact Section */}
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Immediate Help Banner */}
          <div className="bg-destructive/10 border-2 border-destructive/30 rounded-2xl p-8 mb-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-foreground/80 mb-6">
              If you are in immediate danger or experiencing a medical emergency, please call emergency services.
            </p>
            <a
              href="tel:911"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-destructive/90 transition-colors"
            >
              <Phone className="w-6 h-6" />
              Call 911
            </a>
          </div>

          {/* Crisis Hotlines */}
          <div className="space-y-6 mb-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">
              Crisis Hotlines
            </h2>

            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    988 Suicide & Crisis Lifeline
                  </h3>
                  <p className="text-foreground/75 text-sm mb-3">
                    Free, confidential support for people in distress, 24/7.
                  </p>
                  <a href="tel:988" className="text-primary font-medium hover:underline">
                    Call or Text 988
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    Crisis Text Line
                  </h3>
                  <p className="text-foreground/75 text-sm mb-3">
                    Free, 24/7 support for those in crisis. Text from anywhere in the US.
                  </p>
                  <span className="text-primary font-medium">
                    Text HOME to 741741
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    International Association for Suicide Prevention
                  </h3>
                  <p className="text-foreground/75 text-sm mb-3">
                    Find crisis centers around the world.
                  </p>
                  <a 
                    href="https://www.iasp.info/resources/Crisis_Centres/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    SAMHSA National Helpline
                  </h3>
                  <p className="text-foreground/75 text-sm mb-3">
                    Free, confidential, 24/7 treatment referral and information service.
                  </p>
                  <a href="tel:1-800-662-4357" className="text-primary font-medium hover:underline">
                    1-800-662-HELP (4357)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="glass-panel p-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">
              Additional Support
            </h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                <strong>Veterans Crisis Line:</strong> Call 988, then Press 1, or text 838255
              </p>
              <p>
                <strong>Trevor Project (LGBTQ+ Youth):</strong> Call 1-866-488-7386 or text START to 678-678
              </p>
              <p>
                <strong>National Domestic Violence Hotline:</strong> 1-800-799-7233
              </p>
              <p>
                <strong>NAMI Helpline:</strong> 1-800-950-NAMI (6264)
              </p>
            </div>
          </div>

          {/* Supportive Message */}
          <div className="text-center glass-panel mt-8 p-6">
            <p className="text-lg text-foreground italic">
              "You matter. Your life matters. Please reach out for help."
            </p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Crisis;