import { Button } from "@/components/ui/button";
import articleYoga from "@/assets/article-yoga.jpg";
import articleJournaling from "@/assets/article-journaling.jpg";
import articleNature from "@/assets/article-nature.jpg";

const articles = [
  {
    image: articleYoga,
    category: "Mindfulness",
    title: "5 Morning Rituals for a Centered Day",
    description: "Transform your mornings with simple practices that set a positive tone for the entire day ahead.",
    link: "#",
  },
  {
    image: articleJournaling,
    category: "Self-Care",
    title: "The Power of Journaling for Mental Clarity",
    description: "Discover how putting pen to paper can unlock insights and promote emotional well-being.",
    link: "#",
  },
  {
    image: articleNature,
    category: "Wellness",
    title: "Nature's Role in Mental Health",
    description: "Explore the healing benefits of spending time outdoors and reconnecting with the natural world.",
    link: "#",
  },
];

const LatestArticles = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground text-lg">
            Insights and guidance to support your personal growth journey.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  {article.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-primary mt-2 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.description}
                </p>
                <a
                  href={article.link}
                  className="text-primary font-medium hover:underline underline-offset-4 transition-all duration-200"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="sage" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
