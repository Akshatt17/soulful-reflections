import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-6">
                About Soulful Reflections
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A sanctuary for healing, reflection, and personal growth. We believe 
                that everyone deserves access to tools and resources that support 
                their journey toward inner peace and transformation.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated bg-card">
                <img
                  src="/placeholder.svg"
                  alt="Dr. Sarah Mitchell"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To create a compassionate space where individuals can explore their inner landscape, 
              develop self-awareness, and cultivate the tools needed for lasting well-being. 
              We combine evidence-based practices with timeless wisdom to support your unique journey.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Soulful Reflections was born from a deeply personal journey. After years of working 
                in clinical settings, I witnessed countless individuals struggling to find accessible, 
                meaningful resources for their mental health and personal growth.
              </p>
              <p className="mb-6">
                I saw people who wanted to understand themselves better but didn't know where to start. 
                I met those who needed gentle guidance but couldn't access traditional therapy. 
                And I observed how small moments of reflection could spark profound transformation.
              </p>
              <p className="mb-6">
                This platform is my offering to those seekers—a carefully curated collection of 
                self-assessment tools, reflective practices, articles, and media designed to meet 
                you wherever you are on your journey.
              </p>
              <p>
                Whether you're taking your first steps toward self-discovery or deepening an 
                existing practice, I'm honored to be part of your path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-primary mb-12 text-center">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Compassionate Inquiry",
                description: "We believe in approaching ourselves with kindness and curiosity, not judgment."
              },
              {
                title: "Holistic Well-being",
                description: "True wellness encompasses mind, body, and spirit—all interconnected and worthy of attention."
              },
              {
                title: "Accessible Growth",
                description: "Personal development should be available to everyone, regardless of background or resources."
              }
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-8 shadow-card">
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

      {/* Credentials Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
              Credentials & Background
            </h2>
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">
                Dr. Sarah Mitchell, PsyD
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Doctorate in Clinical Psychology, Stanford University</li>
                <li>• Certified Mindfulness-Based Stress Reduction (MBSR) Teacher</li>
                <li>• 15+ years of clinical experience</li>
                <li>• Specialization in anxiety, depression, and life transitions</li>
                <li>• Published author on mindfulness and self-compassion</li>
                <li>• Member, American Psychological Association</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              Begin Your Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Explore our collection of articles, tools, and resources designed to support your growth.
            </p>
            <Link to="/articles">
              <Button variant="hero" size="lg">
                Explore Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
