export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-12">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Tech Portfolio — Built with care.</p>
        <nav className="flex gap-4">
          <a href="#projects" className="story-link">Projects</a>
          <a href="#skills" className="story-link">Skills</a>
          <a href="#certifications" className="story-link">Certifications</a>
          <a href="#contact" className="story-link">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
