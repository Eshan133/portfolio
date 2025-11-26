import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tech.jpg";
import { Github, ExternalLink, FileText, Download } from "lucide-react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = glowRef.current?.parentElement;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <header className="relative overflow-hidden">
      <nav className="container mx-auto flex items-center justify-between py-6">
        <a href="#top" className="font-display text-lg tracking-widest story-link">
          Portfolio
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors story-link">
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative container mx-auto pt-10 pb-20 md:pt-16 md:pb-28">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(450px 250px at ${pos.x}px ${pos.y}px, hsl(var(--brand)/0.20), transparent 60%)`,
          }}
        />

        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Futuristic dark neon tech grid background for portfolio hero"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>

        <main className="relative">
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight tracking-tight animate-enter">
            ISHAN MAHARJAN
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground animate-fade-in">
            Teaching Assistant, aspiring to be AI Researcher. Working on freelancing projects along the way.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects">
              <Button variant="hero" size="lg" className="hover-scale">
                Explore Projects
              </Button>
            </a>
            <a href="/cv.pdf" target="_blank" rel="noreferrer">
              <Button variant="glow" size="lg" className="hover-scale">
                <FileText /> View CV
              </Button>
            </a>
            <a href="/cv.pdf" download>
              <Button variant="ghost" size="lg" className="hover-scale">
                <Download /> Download CV
              </Button>
            </a>
            {/* <a href="#contact">
              <Button variant="glow" size="lg" className="hover-scale">
                Get in Touch
              </Button>
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg" className="hover-scale">
                <Github /> GitHub
              </Button>
            </a>
            <a href="#projects">
              <Button variant="link" size="lg" className="hover-scale">
                <ExternalLink /> Live Demos
              </Button>
            </a> */}
          </div>
        </main>
      </div>
    </header>
  );
}
