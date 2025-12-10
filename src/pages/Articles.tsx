import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import articlesData from "@/data/articles.json";

const ITEMS_PER_PAGE = 6;

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(articlesData.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articlesData;
    return articlesData.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
            Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and guidance to support your personal growth journey.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {paginatedArticles.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No articles found in this category.
            </p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    slug={article.slug}
                    title={article.title}
                    category={article.category}
                    excerpt={article.excerpt}
                    heroImage={article.heroImage}
                    readTime={article.readTime}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "hero" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;
