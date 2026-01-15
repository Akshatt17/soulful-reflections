import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Eye, GraduationCap, Award, Briefcase } from "lucide-react";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-muted">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up">
              <span className="inline-block text-xs font-semibold tracking-wider text-sage uppercase mb-4">
                ABOUT
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance mb-8">
                About Soulful Reflections
              </h1>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
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
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Our Philosophy
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Text Content */}
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-xl font-medium text-foreground">
                The mind is not fragile—it is adaptive, resilient, and capable of growth.
              </p>
              <p>
                Healing does not always mean eliminating pain; sometimes it means understanding it, responding to it differently, and learning to move forward with awareness.
              </p>
              <p className="text-muted-foreground">
                Every mental health journey is unique, and every step—small or uncertain—is still movement.
              </p>
            </div>

            {/* Right - Belief Cards */}
            <div className="relative">
              <div className="bg-muted rounded-2xl p-8 lg:p-10 shadow-card">
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  What We Believe
                </span>
                <p className="text-lg text-foreground mt-4 mb-6">
                  At Soulful Reflections, we believe that:
                </p>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg text-muted-foreground pt-1.5">Insight brings empowerment</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg text-muted-foreground pt-1.5">Compassion creates change</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg text-muted-foreground pt-1.5">Awareness makes recovery possible</span>
                  </li>
                </ul>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Accessible Understanding",
                description: "To make mental health understanding accessible, humane, and stigma-free."
              },
              {
                title: "Early Recognition",
                description: "To help individuals recognise emotional distress early, understand psychiatric conditions with clarity, and feel confident seeking help when needed."
              },
              {
                title: "Science & Empathy",
                description: "To bridge science with empathy—so awareness leads to action, not avoidance."
              }
            ].map((item, index) => (
              <div 
                key={item.title} 
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-smooth"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-sage/20 rounded-xl flex items-center justify-center mb-5">
                  <div className="w-3 h-3 bg-sage rounded-full" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Meet the Founder
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Photo */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={drNiharika}
                  alt="Dr. Niharika Bhaskar"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-sage/20 rounded-2xl" />
            </div>

            {/* Right - Credentials */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  Your Guide
                </span>
                <h3 className="font-serif text-3xl font-bold text-primary mt-2">
                  Dr. Niharika Bhaskar
                </h3>
                <p className="text-lg text-muted-foreground mt-1">
                  Psychiatrist & Mental Health Advocate
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Education</h4>
                    <p className="text-muted-foreground text-sm">MBBS, MD Psychiatry</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Specialization</h4>
                    <p className="text-muted-foreground text-sm">Anxiety, Depression, Stress Management & Emotional Well-being</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Approach</h4>
                    <p className="text-muted-foreground text-sm">Compassionate, evidence-based care with focus on holistic mental wellness</p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                With years of clinical experience and a deep commitment to destigmatizing mental health, Dr. Niharika created Soulful Reflections to extend support beyond the consultation room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-elevated">
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-xl text-foreground font-medium leading-relaxed">
                  Soulful Reflections grew from something I kept witnessing again and again—people struggling to find words for what they were feeling inside.
                </p>
                <p>
                  As a psychiatrist, I often noticed that long before any diagnosis entered the conversation, people wanted something much simpler and much deeper: to be heard, to feel understood, and to make sense of their emotions without fear or self-judgment. Many carried questions they had never voiced out loud. Many were afraid of labels, yet quietly searching for clarity and reassurance.
                </p>
                <p>
                  Over time, it became clear to me that mental health needed a quieter, gentler space—one where understanding could begin even before a consultation, and continue long after it ends.
                </p>
                
                {/* Pull Quote */}
                <blockquote className="border-l-4 border-primary pl-6 my-8 py-2">
                  <p className="text-xl font-serif text-primary italic">
                    "I created Soulful Reflections with the hope that you feel a little less afraid of your own mind."
                  </p>
                </blockquote>
                
                <p>
                  This space is meant to help you understand your thoughts, emotions, and struggles with kindness rather than judgment. Mental health, to me, is not only about illness—it is about awareness, courage, and knowing when to seek support without shame. If this platform helps you pause, reflect, and feel more confident about caring for your mental well-being, then it has fulfilled the purpose I envisioned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Begin Your Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Explore our collection of articles, tools, and resources designed to support your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles">
                <Button variant="hero" size="xl">
                  Read Reflections
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="sage" size="xl">
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
