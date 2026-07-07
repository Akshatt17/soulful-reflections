import PageLayout from "@/components/PageLayout";
import { Shield } from "lucide-react";

const Privacy = () => (
  <PageLayout>
    {/* Hero Section */}
    <section className="py-16">
      <div className="container-custom radial-tint px-4 py-6 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Your privacy matters to us. Learn how we collect, use, and protect your information.
        </p>
      </div>
    </section>

    {/* Privacy Content */}
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Information We Collect
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p className="mb-4">
                  We collect information you provide directly, such as when you subscribe to our 
                  newsletter or use our self-assessment tools.
                </p>
                <ul className="space-y-2">
                  <li>Email address (when you subscribe or save assessment results)</li>
                  <li>Name (optional, when provided)</li>
                  <li>Assessment responses (stored locally on your device unless you opt to save)</li>
                  <li>Basic usage analytics (anonymized)</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                How We Use Your Information
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <ul className="space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To send newsletters and updates (with your consent)</li>
                  <li>To respond to your inquiries</li>
                  <li>To personalize your experience when you opt in</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Data Storage & Security
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p className="mb-4">
                  Assessment results are stored locally on your device by default. They are only 
                  transmitted to our servers if you explicitly choose to save and receive your results via email.
                </p>
                <p>
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Your Rights
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <ul className="space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Contact Us
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/80">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@soulfulreflections.com" className="text-primary hover:underline">
                    privacy@soulfulreflections.com
                  </a>
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

export default Privacy;