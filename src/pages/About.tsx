import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-sm font-medium text-primary/80 uppercase tracking-wider mb-4">
              ABOUT
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-8">
              About Soulful Reflections
            </h1>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left">
              <p>
                Soulful Reflections is a space for people who think deeply, feel intensely, and often find themselves searching for meaning in their emotions. It is meant for moments when you don't need answers immediately—but need understanding first.
              </p>
              <p>
                Here, thoughts are explored without rushing, emotions are acknowledged without labeling them as right or wrong, and the mind is seen as something to be understood rather than fixed. It is a place to read slowly, reflect quietly, and reconnect with yourself in a way that feels grounding and honest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
              Our Philosophy
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                The mind is not fragile—it is adaptive, resilient, and capable of growth.
              </p>
              <p>
                Healing does not always mean eliminating pain; sometimes it means understanding it, responding to it differently, and learning to move forward with awareness.
              </p>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <p className="text-lg text-foreground mb-6">
                At Soulful Reflections, we believe that:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  <span className="text-lg">Insight brings empowerment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  <span className="text-lg">Compassion creates change</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  <span className="text-lg">Awareness makes recovery possible</span>
                </li>
              </ul>
              <p className="text-lg text-muted-foreground mt-6">
                Every mental health journey is unique, and every step—small or uncertain—is still movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
              Our Mission
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                To make mental health understanding accessible, humane, and stigma-free.
              </p>
              <p>
                To help individuals recognise emotional distress early, understand psychiatric conditions with clarity, and feel confident seeking help when needed.
              </p>
              <p>
                To bridge science with empathy—so awareness leads to action, not avoidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Soulful Reflections grew from something I kept witnessing again and again—people struggling to find words for what they were feeling inside.
              </p>
              <p>
                As a psychiatrist, I often noticed that long before any diagnosis entered the conversation, people wanted something much simpler and much deeper: to be heard, to feel understood, and to make sense of their emotions without fear or self-judgment. Many carried questions they had never voiced out loud. Many were afraid of labels, yet quietly searching for clarity and reassurance.
              </p>
              <p>
                Over time, it became clear to me that mental health needed a quieter, gentler space—one where understanding could begin even before a consultation, and continue long after it ends.
              </p>
              <p>
                I created Soulful Reflections with the hope that you feel a little less afraid of your own mind. This space is meant to help you understand your thoughts, emotions, and struggles with kindness rather than judgment. Mental health, to me, is not only about illness—it is about awareness, courage, and knowing when to seek support without shame. If this platform helps you pause, reflect, and feel more confident about caring for your mental well-being, then it has fulfilled the purpose I envisioned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              Begin Your Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore our collection of articles, tools, and resources designed to support your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles">
                <Button variant="hero" size="lg">
                  Read Reflections
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="lg">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
