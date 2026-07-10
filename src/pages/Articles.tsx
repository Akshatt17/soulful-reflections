import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import articlesData from "@/data/articles.json";

const ITEMS_PER_PAGE = 6;

// Extract unique categories from articles
const categories = ["All Topics", ...new Set(articlesData.map((a) => a.category))];

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedArticles = useMemo(() => {
    let result = [...articlesData];

    // Filter by category
    if (selectedCategory !== "All Topics") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort articles
    if (sortBy === "latest") {
      result.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());
    }
    // "most-read" would require view counts - keeping same order for now

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="py-16 lg:py-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <div className="radial-tint mx-auto max-w-2xl py-6">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
              Articles
            </h1>
            <p className="text-lg text-foreground/80">
              A dedicated space for long-form reading. Explore insights on mindfulness,
              self-care, and personal growth at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section>
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Topic Filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/50 text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-card/60 border-border/60"
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-36 bg-card/60 border-border/60">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-read">Most Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All Topics");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-8">
                Showing {paginatedArticles.length} of {filteredAndSortedArticles.length} articles
              </p>

              {/* Grid */}
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
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "hero" : "ghost"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Load More Alternative (for future infinite scroll) */}
              {/* 
              <div className="text-center">
                <Button variant="sage" size="lg">
                  Load More Articles
                </Button>
              </div>
              */}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;
