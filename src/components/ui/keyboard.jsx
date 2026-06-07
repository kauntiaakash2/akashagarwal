import React from "react";

const keyboardRows = [
  ["esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "↵"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ".", "shift"],
  ["ctrl", "⌘", "alt", "space", "alt", "fn"],
];

const wideKeys = new Set(["tab", "caps", "shift", "⌫", "↵", "ctrl", "alt", "fn", "⌘"]);

export function Keyboard({ enableSound = false }) {
  const handleKeyPress = () => {
    if (!enableSound || typeof window === "undefined") return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = 180;
    oscillator.type = "triangle";
    gain.gain.setValueAtTime(0.02, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.04);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.045);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[2rem] border border-orange-300/20 bg-zinc-950/95 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.55),0_0_60px_rgba(255,191,72,0.14)] backdrop-blur md:p-5">
      <div className="space-y-2 rounded-[1.5rem] border border-white/5 bg-gradient-to-b from-zinc-900 to-black p-3 md:space-y-3 md:p-5">
        {keyboardRows.map((row, rowIndex) => (
          <div key={`keyboard-row-${rowIndex}`} className="flex justify-center gap-1.5 md:gap-2.5">
            {row.map((keyLabel) => (
              <button
                key={`${rowIndex}-${keyLabel}`}
                type="button"
                onMouseDown={handleKeyPress}
                className={`h-9 rounded-lg border border-white/10 bg-zinc-900 text-[0.58rem] font-bold uppercase tracking-widest text-zinc-300 shadow-[inset_0_-3px_0_rgba(255,255,255,0.04),0_8px_16px_rgba(0,0,0,0.35)] transition active:translate-y-0.5 active:shadow-none md:h-12 md:text-xs ${
                  keyLabel === "space" ? "w-44 md:w-72" : wideKeys.has(keyLabel) ? "w-12 md:w-20" : "w-8 md:w-12"
                }`}
              >
                {keyLabel === "space" ? "" : keyLabel}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
