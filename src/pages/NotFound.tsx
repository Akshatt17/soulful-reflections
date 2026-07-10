import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="glass-panel p-10 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold text-primary">404</h1>
          <p className="mb-4 text-xl text-foreground/80">Oops! Page not found</p>
          <Link to="/" className="text-primary underline underline-offset-4 hover:text-berry">
            Return to Home
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
