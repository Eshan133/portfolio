import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Transformer Implementation",
    desc: "Paper Implementation of Attention is All You Need paper along with notes",
    tech: ["Pytorch"],
    github: "https://github.com/Eshan133/transformer_implementation",
    demo: "#",
  },
  {
    title: "Neural Style Transfer",
    desc: "Implement the NST algorithm from Gatys et al. (2015)",
    tech: ["Pytorch", "GoogleColab"],
    github: "https://github.com/Eshan133/Neural-Style-Transfer",
    demo: "#",
  },
  {
    title: "AI Docs Helper",
    desc: "Semantic search and chat over your docs with Streamlit UX.",
    tech: ["Embedding", "RAG", "Streamlit"],
    github: "https://github.com/Eshan133/Chat-with-multiple-pdf.git",
    demo: "#",
  },
  {
    title: "Neural Network from Scratch",
    desc: "Deep dive into Custom Forward prop -> Cost Function -> Backprop Function",
    tech: ["Python"],
    github: "https://github.com/Eshan133/Deep-Neural-Network-Scratch-.git",
    demo: "#",
  },
  {
    title: "Caltech101 Classification",
    desc: "Comparing tiny VGG Net and Resnet50 on Caltech101. Evaluating their performance, making prediction.",
    tech: ["Pytorch", "Pandas", "Numpy", "Transfer Learning"],
    github: "https://github.com/Eshan133/Caltech101_resnet50.git",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="container mx-auto py-16 md:py-24">
      <h2 id="projects-title" className="font-display text-3xl md:text-4xl mb-6">Projects</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Selected work with source code and live previews. Each project emphasizes clarity, performance, and polish.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.title} className="group bg-card/50 border-border/60 hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">{p.title}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary/50 ring-1 ring-border/60">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <a href={p.github} target="_blank" rel="noreferrer">
                <Button variant="glow" size="sm" className="hover-scale"><Github /> Code</Button>
              </a>
              <a href={p.demo} target="_blank" rel="noreferrer">
                <Button variant="hero" size="sm" className="hover-scale"><ExternalLink /> Demo</Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
