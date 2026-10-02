export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`spark ${className}`}
      viewBox="0 0 50 50"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M25 0C29 14 36 21 50 25C36 29 29 36 25 50C21 36 14 29 0 25C14 21 21 14 25 0Z" />
    </svg>
  );
}
export function Signature() {
  // Custom hand-drawn “Akash” lettering, matching the original monoline signature.
  return (
    <svg viewBox="0 0 164 82" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 63C16 52 26 31 36 19C42 12 42 19 40 30L35 61M17 46C25 43 34 42 44 44" />
        <path d="M44 60C49 44 52 26 59 20C68 12 64 28 58 38L49 49C55 40 63 35 66 39C69 43 58 48 51 49C58 49 57 64 67 57" />
        <path d="M86 42C81 34 72 39 69 49C64 64 77 64 84 48L88 39C84 48 80 64 90 58L95 53" />
        <path d="M109 41C105 34 93 38 96 45C98 50 108 51 104 57C101 63 94 63 91 58M104 58C109 56 113 51 117 45" />
        <path d="M111 60C116 44 120 25 126 19C136 10 132 27 125 37L117 47C123 39 130 36 133 40C137 45 126 61 136 59C140 58 143 54 146 53" />
      </g>
      <path
        d="M146 53C150 51 153 52 157 54"
        stroke="var(--text)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
