import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import articlesData from "@/data/articles.json";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageLayout>
        <div className="section-padding text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/articles">
            <Button variant="hero">Back to Articles</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const relatedArticles = articlesData
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Image */}
      <section className="bg-muted">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
          <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
              {article.title}
            </h1>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-serif prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Box */}
            <div className="mt-10 bg-muted rounded-2xl p-6 flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{article.author.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{article.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((a) => (
                <ArticleCard
                  key={a.id}
                  slug={a.slug}
                  title={a.title}
                  category={a.category}
                  excerpt={a.excerpt}
                  heroImage={a.heroImage}
                  readTime={a.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ArticleDetail;
