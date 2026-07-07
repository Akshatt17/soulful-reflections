import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import CrisisBox from "@/components/CrisisBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with actual API endpoint
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Message Sent", description: "Thank you for reaching out. We'll respond soon." });
    (e.target as HTMLFormElement).reset();
    setLoading(false);
  };

  return (
    <PageLayout>
      <section className="py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <div className="radial-tint mx-auto max-w-2xl py-6">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">Contact Us</h1>
            <p className="text-lg text-foreground/80">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-8">
              <div><label className="block text-sm font-medium mb-2">Name</label><Input required placeholder="Your name" className="bg-card/60 border-border/60" /></div>
              <div><label className="block text-sm font-medium mb-2">Email</label><Input required type="email" placeholder="you@example.com" className="bg-card/60 border-border/60" /></div>
              <div><label className="block text-sm font-medium mb-2">Message</label><Textarea required rows={5} placeholder="How can we help?" className="bg-card/60 border-border/60" /></div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
            </form>
            <div className="mt-10"><CrisisBox /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default Contact;
