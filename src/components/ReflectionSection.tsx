import { Button } from "@/components/ui/button";
import notebookImage from "@/assets/reflection-notebook.jpg";

const ReflectionSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Reflection of the Week
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="rounded-2xl overflow-hidden shadow-card">
            <img
              src={notebookImage}
              alt="Journal notebook with tea and dried flowers"
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>

          {/* Right - Card */}
          <div className="bg-muted rounded-2xl p-8 lg:p-10 shadow-card">
            <span className="text-xs font-semibold tracking-wider text-sage uppercase">
              Featured Article
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mt-3 mb-4">
              The Art of Letting Go: Finding Peace in Uncertainty
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Life often presents us with moments that challenge our need for control. 
              In this week's reflection, we explore how embracing uncertainty can become 
              a pathway to inner freedom. Discover practical techniques for releasing 
              attachments and finding serenity amidst life's unpredictable nature.
            </p>
            <Button variant="hero" size="lg">
              Read Full Article
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReflectionSection;
