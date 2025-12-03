import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-meditation.jpg";

const HeroSection = () => {
  return (
    <section className="bg-muted">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
              A Space for Healing, Reflection & Growth
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Discover a sanctuary where mindfulness meets meaning. Through guided reflections, 
              self-assessment tools, and curated resources, we support your journey toward 
              inner peace and personal transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl">
                Start Your Journey
              </Button>
              <Button variant="sage" size="xl">
                Explore Resources
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Woman meditating peacefully in a bright room"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
