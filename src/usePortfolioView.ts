import { useEffect, useLayoutEffect, useState } from "react";

// Hash views preserve the original anchor URLs and work on static hosting.
export function usePortfolioView() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const restoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const change = () => setHash(window.location.hash);
    window.addEventListener("hashchange", change);
    return () => {
      history.scrollRestoration = restoration;
      window.removeEventListener("hashchange", change);
    };
  }, []);
  useLayoutEffect(() => {
    if (hash.startsWith("#/")) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document
        .querySelector<HTMLElement>(".page-heading h1, .project-detail h1")
        ?.focus({ preventScroll: true });
    } else if (hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
  }, [hash]);
  return hash.startsWith("#/") ? hash.slice(2).split("/") : ["home"];
}
