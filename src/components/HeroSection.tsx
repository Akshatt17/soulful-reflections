import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-therapy.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-artic-daisy via-cream to-rose-blush/30">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-olive-petal/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-golden-clover/15 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-peach-blossom/10 blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-petal/15 border border-olive-petal/25">
              <span className="w-2 h-2 rounded-full bg-olive-petal animate-pulse" />
              <span className="text-sm font-medium text-olive-petal">Your Wellness Journey Starts Here</span>
            </div>
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
            <div className="relative rounded-2xl overflow-hidden shadow-elevated ring-1 ring-rose-blush/30">
              <img
                src={heroImage}
                alt="Two people in a calm therapy session with warm lighting"
                className="w-full h-auto object-contain"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-olive-petal/15 rounded-2xl" />
            <div className="absolute -z-20 -bottom-8 -right-8 w-full h-full bg-golden-clover/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
