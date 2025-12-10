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
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><label className="block text-sm font-medium mb-2">Name</label><Input required placeholder="Your name" /></div>
              <div><label className="block text-sm font-medium mb-2">Email</label><Input required type="email" placeholder="you@example.com" /></div>
              <div><label className="block text-sm font-medium mb-2">Message</label><Textarea required rows={5} placeholder="How can we help?" /></div>
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
