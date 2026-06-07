import React from "react";
import Loader from "./ui/loader.jsx";

export function PortfolioLoadingScreen({ onLoadingComplete }) {
  const [isExiting, setIsExiting] = React.useState(false);

  React.useEffect(() => {
    // Keep the loader visible for 2.5 seconds, then start the fade-out
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    return () => window.clearTimeout(exitTimer);
  }, []);

  React.useEffect(() => {
    if (!isExiting) return undefined;

    // Wait 700ms for the CSS fade-out transition to finish before unmounting
    const completionTimer = window.setTimeout(() => {
      onLoadingComplete?.();
    }, 700);

    return () => window.clearTimeout(completionTimer);
  }, [isExiting, onLoadingComplete]);

  return (
    <section
      className={`fixed inset-0 z-[100] min-h-screen overflow-hidden bg-[#030303] text-white transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="Loading portfolio workspace"
      aria-live="polite"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,191,72,0.12),rgba(3,3,3,0.72)_42%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,191,72,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,191,72,0.035)_1px,transparent_1px)] bg-[length:42px_42px] opacity-45" />

      {/* Loader */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </div>
    </section>
  );
}
