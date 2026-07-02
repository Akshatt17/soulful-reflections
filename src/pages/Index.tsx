import { MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AssessmentTools from "@/components/AssessmentTools";
import LatestArticles from "@/components/LatestArticles";
import MicroReflections from "@/components/MicroReflections";
import Newsletter from "@/components/Newsletter";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import ReflectionScene from "@/components/scene/ReflectionScene";
import DepthSection from "@/components/landing/DepthSection";
import LandingHero from "@/components/landing/LandingHero";
import ReflectionOfWeek from "@/components/landing/ReflectionOfWeek";
import AboutFounder from "@/components/landing/AboutFounder";

const Index = () => {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <ReflectionScene>
        <div className="relative z-10 min-h-screen">
          <Header />
          <main>
            <LandingHero />

            <DepthSection ariaLabel="Reflection for the week">
              <ReflectionOfWeek />
            </DepthSection>

            <DepthSection ariaLabel="About Soulful Reflections">
              <AboutFounder />
            </DepthSection>

            <DepthSection ariaLabel="Self-assessment tools">
              <AssessmentTools />
            </DepthSection>

            <DepthSection ariaLabel="Latest articles">
              <LatestArticles />
            </DepthSection>

            <DepthSection ariaLabel="Micro-reflections">
              <MicroReflections />
            </DepthSection>

            <DepthSection ariaLabel="Newsletter">
              <Newsletter />
            </DepthSection>
          </main>
          <Footer />
        </div>
        </ReflectionScene>
      </SmoothScrollProvider>
    </MotionConfig>
  );
};

export default Index;
