import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ReflectionSection from "@/components/ReflectionSection";
import AssessmentTools from "@/components/AssessmentTools";
import MicroReflections from "@/components/MicroReflections";
import LatestArticles from "@/components/LatestArticles";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ReflectionSection />
        <AssessmentTools />
        <MicroReflections />
        <LatestArticles />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
