import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReflectionScene from "@/components/scene/ReflectionScene";

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * Shared chrome for every non-landing page: the ambient water scene fixed behind
 * everything (no centerpiece — that stays on the landing descent), with the page
 * content layered above it. Sections that want the scene to show through should
 * use translucent glass panes instead of opaque backgrounds (see
 * docs/design/theme.md).
 */
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <ReflectionScene variant="ambient">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ReflectionScene>
  );
};

export default PageLayout;
