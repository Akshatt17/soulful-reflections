import { Link } from "react-router-dom";

interface ArticleCardProps {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  heroImage: string;
  readTime?: string;
}

const ArticleCard = ({ slug, title, category, excerpt, heroImage, readTime }: ArticleCardProps) => {
  return (
    <article className="glass-panel glass-panel-hover overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold tracking-wider text-forest uppercase">
            {category}
          </span>
          {readTime && (
            <span className="text-xs text-muted-foreground">{readTime}</span>
          )}
        </div>
        <h3 className="font-serif text-xl font-bold text-primary mt-2 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          to={`/articles/${slug}`}
          className="text-primary font-medium hover:underline underline-offset-4 transition-all duration-200"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
