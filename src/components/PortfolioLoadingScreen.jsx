import React from "react";
import Loader from "./ui/loader.jsx";
import { Keyboard } from "./ui/keyboard.jsx";
import { Terminal } from "./ui/terminal.jsx";

const loadingCommands = ["sudo su Akash Agarwal", "Welcome to the Garage Builder"];

const loadingOutputs = {
  0: ["[sudo] password for Akash Agarwal:"],
  1: ["Access Granted. Initializing workspace..."],
};

const loadingCommandPrompts = { 1: "" };
const passwordCommandIndexes = [1];

export function PortfolioLoadingScreen({ onLoadingComplete }) {
  const [phase, setPhase] = React.useState("loader");
  const [terminalComplete, setTerminalComplete] = React.useState(false);

  React.useEffect(() => {
    const transitionTimer = window.setTimeout(() => {
      setPhase("terminal");
    }, 2500);

    return () => window.clearTimeout(transitionTimer);
  }, []);

  React.useEffect(() => {
    if (!terminalComplete) return undefined;

    const completionTimer = window.setTimeout(() => {
      onLoadingComplete?.();
    }, 1000);

    return () => window.clearTimeout(completionTimer);
  }, [onLoadingComplete, terminalComplete]);

  return (
    <section
      className="fixed inset-0 z-[100] min-h-screen overflow-hidden bg-[#030303] text-white"
      aria-label="Loading portfolio workspace"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,191,72,0.12),rgba(3,3,3,0.72)_42%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,191,72,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,191,72,0.035)_1px,transparent_1px)] bg-[length:42px_42px] opacity-45" />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
          phase === "loader" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Loader />
      </div>

      <div
        className={`relative z-10 flex h-full min-h-screen flex-col items-center justify-end gap-8 px-4 pb-6 pt-10 transition-opacity duration-700 ease-out md:gap-10 md:px-8 md:pb-10 ${
          phase === "terminal" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {phase === "terminal" && (
          <>
            <div className="flex w-full flex-1 items-center justify-center pt-6">
              <Terminal
                commands={loadingCommands}
                outputs={loadingOutputs}
                typingSpeed={58}
                delayBetweenCommands={900}
                commandPrompts={loadingCommandPrompts}
                passwordCommandIndexes={passwordCommandIndexes}
                onComplete={() => setTerminalComplete(true)}
              />
            </div>
            <div className="w-full shrink-0">
              <Keyboard enableSound />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
