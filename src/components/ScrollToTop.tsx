import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top on every route change. Both the landing page (Lenis)
 * and the other pages (native scroll) scroll the window, so window.scrollTo
 * covers both. In-page scrolling on "/" doesn't change the pathname, so this
 * never interferes with the descent scrub.
 */
const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
