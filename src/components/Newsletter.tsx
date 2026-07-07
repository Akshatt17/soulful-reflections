import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";

/** Compact right-aligned signup pane over the settled bloom. */
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
    <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <GlassPanel className="max-w-md p-8 sm:p-10 md:ml-auto md:mr-[8%]">
        <motion.h2
          variants={fadeInUp}
          className="font-serif text-2xl font-bold text-primary sm:text-3xl"
        >
          Weekly Reflections in Your Inbox
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mt-3 text-sm leading-relaxed text-foreground/80"
        >
          Thoughtful insights, guided practices, and inspiration delivered to you
          each week.
        </motion.p>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12 rounded-xl border-border/60 bg-card/60"
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-border/60 bg-card/60"
            required
          />

          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-1"
            />
            <label
              htmlFor="consent"
              className="cursor-pointer text-xs leading-relaxed text-foreground/70"
            >
              I agree to receive weekly newsletters and understand I can
              unsubscribe at any time.
            </label>
          </div>

          <Button variant="hero" size="xl" className="w-full">
            Subscribe Now
          </Button>
        </motion.form>
      </GlassPanel>
    </div>
  );
};

export default Newsletter;
