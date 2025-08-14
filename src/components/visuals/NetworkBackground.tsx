import { useEffect, useRef, useState } from "react";

// A lightweight, canvas-based global network that subtly rotates with page scroll
// Uses design tokens via CSS variables for colors
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(0);

  // Read CSS HSL variables and convert to hsla strings for canvas
  const getHsl = (name: string, alpha = 1) => {
    const val = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    // Fall back to a pleasant blue if not found
    const hsl = val || "210 80% 60%";
    return `hsla(${hsl} / ${alpha})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Colors from design tokens
      const lineColor = getHsl("--brand", 0.25);
      const dotColor = getHsl("--brand", 0.35);

      // Generate points based on viewport size
      const count = Math.min(140, Math.max(70, Math.floor((w * h) / 24000)));
      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
        });
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Connect close points
      const maxDist = Math.min(160, Math.max(90, Math.hypot(w, h) * 0.08));
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            ctx.globalAlpha = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.globalAlpha = 1;
      ctx.fillStyle = dotColor;
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setAngle(window.scrollY * 0.03); // degrees per pixel scrolled
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none select-none">
      <div
        style={{
          transform: `rotate(${angle}deg) scale(1.1)`,
          transformOrigin: "50% 50%",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
        className="absolute inset-0"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
      </div>
    </div>
  );
}
