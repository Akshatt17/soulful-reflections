import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log({ firstName, email, consent });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 lg:p-12 shadow-elevated text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-3">
            Weekly Reflections in Your Inbox
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our community and receive thoughtful insights, guided practices, 
            and inspiration delivered to you each week.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 rounded-xl border-border bg-background"
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-border bg-background"
                required
              />
            </div>

            <div className="flex items-start gap-3 text-left">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                I agree to receive weekly newsletters and understand I can unsubscribe at any time.
              </label>
            </div>

            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
