import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container mx-auto py-16 md:py-24">
      <h2 id="contact-title" className="font-display text-3xl md:text-4xl mb-6">Contact</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Interested in collaborating or have an opportunity in mind? I’d love to chat.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a href="mailto:ishan.maharjan5@gmail.com">
          <Button variant="hero" className="hover-scale"><Mail /> Email</Button>
        </a>
        <a href="https://www.linkedin.com/in/ishan-maharjan-19aa06212" target="_blank" rel="noreferrer">
          <Button variant="glow" className="hover-scale"><Linkedin /> LinkedIn</Button>
        </a>
        <a href="https://github.com/Eshan133" target="_blank" rel="noreferrer">
          <Button variant="ghost" className="hover-scale"><Github /> GitHub</Button>
        </a>
      </div>
    </section>
  );
}
