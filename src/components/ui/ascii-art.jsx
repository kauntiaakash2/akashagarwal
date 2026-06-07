import React from "react";

const CHARACTER_SETS = {
  standard: " .:-=+*#%@",
  matrix: "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@",
};

function getAsciiCharacter(brightness, inverted) {
  const ramp = inverted ? CHARACTER_SETS.standard.split("").reverse().join("") : CHARACTER_SETS.standard;
  const index = Math.min(ramp.length - 1, Math.floor((brightness / 255) * (ramp.length - 1)));
  return ramp[index];
}

export function AsciiArt({
  src,
  resolution = 80,
  color = "#00ff00",
  animationStyle = "matrix",
  inverted = false,
  animateOnView = false,
  className = "",
}) {
  const canvasRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const imageDataRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(!animateOnView);

  React.useEffect(() => {
    if (!animateOnView || !wrapperRef.current) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [animateOnView]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper || !isVisible) return undefined;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return undefined;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    let resizeObserver;
    let isDisposed = false;
    let startTime = performance.now();

    const draw = (timestamp = performance.now()) => {
      if (isDisposed) return;

      const snapshot = imageDataRef.current;
      if (!snapshot) return;

      const { width, height, cells, cellWidth, cellHeight, fontSize } = snapshot;
      const elapsed = timestamp - startTime;
      const revealProgress = animationStyle === "matrix" ? Math.min(1, elapsed / 1700) : 1;
      const matrixCharacters = CHARACTER_SETS.matrix;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#020402";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      cells.forEach((cell) => {
        const rowProgress = cell.row / snapshot.rows;
        const shouldResolve = revealProgress > rowProgress;
        const flicker = animationStyle === "matrix" && Math.random() > 0.985;
        const character = shouldResolve && !flicker
          ? cell.character
          : matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        const alpha = shouldResolve ? Math.max(0.2, cell.alpha) : 0.14;

        context.fillStyle = `rgba(${cell.rgb}, ${alpha})`;
        context.fillText(character, cell.x + cellWidth / 2, cell.y + cellHeight / 2);
      });

      if (animationStyle === "matrix" && revealProgress < 1) {
        context.fillStyle = "rgba(0, 255, 90, 0.18)";
        context.fillRect(0, Math.max(0, height * revealProgress - cellHeight * 2), width, cellHeight * 2);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const buildAscii = () => {
      if (isDisposed) return;

      const bounds = wrapper.getBoundingClientRect();
      const width = Math.max(1, Math.floor(bounds.width));
      const height = Math.max(1, Math.floor(bounds.height));
      const pixelRatio = window.devicePixelRatio || 1;
      const columns = Math.max(32, resolution);
      const cellWidth = width / columns;
      const cellHeight = cellWidth * 1.72;
      const rows = Math.max(18, Math.ceil(height / cellHeight));
      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });

      if (!sampleContext) return;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleContext.fillStyle = "#000000";
      sampleContext.fillRect(0, 0, columns, rows);

      const imageAspect = image.naturalWidth / image.naturalHeight;
      const sampleAspect = columns / rows;
      let drawWidth = columns;
      let drawHeight = rows;
      let drawX = 0;
      let drawY = 0;

      if (imageAspect > sampleAspect) {
        drawHeight = columns / imageAspect;
        drawY = (rows - drawHeight) / 2;
      } else {
        drawWidth = rows * imageAspect;
        drawX = (columns - drawWidth) / 2;
      }

      sampleContext.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      const cells = [];
      const [red, green, blue] = color.match(/\w\w/g)?.map((value) => parseInt(value, 16)) ?? [0, 255, 0];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = (row * columns + column) * 4;
          const brightness = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;
          const alpha = Math.min(0.94, Math.max(0.08, brightness / 255));
          cells.push({
            row,
            x: column * cellWidth,
            y: row * cellHeight,
            character: getAsciiCharacter(brightness, inverted),
            alpha,
            rgb: `${red}, ${green}, ${blue}`,
          });
        }
      }

      imageDataRef.current = {
        width,
        height,
        rows,
        cells,
        cellWidth,
        cellHeight,
        fontSize: Math.max(7, cellWidth * 1.35),
      };
      startTime = performance.now();
      cancelAnimationFrame(animationFrameRef.current);
      draw(startTime);
    };

    image.onload = () => {
      if (isDisposed) return;

      buildAscii();
      resizeObserver = new ResizeObserver(buildAscii);
      resizeObserver.observe(wrapper);
    };

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameRef.current);
      resizeObserver?.disconnect();
    };
  }, [animationStyle, color, inverted, isVisible, resolution, src]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
