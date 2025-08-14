import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Database, Workflow, LineChart, Image as ImageIcon, Boxes, Sparkles, CloudCog, Bot, CircuitBoard, FlaskConical, Server, Code } from "lucide-react";

const skills = [
  { name: "Python", icon: Code },
  { name: "PyTorch", icon: Cpu },
  { name: "TensorFlow", icon: CircuitBoard },
  { name: "scikit-learn", icon: LineChart },
  { name: "NLP", icon: Sparkles },
  { name: "Computer Vision", icon: ImageIcon },
  { name: "MLOps", icon: CloudCog },
  { name: "Docker", icon: Boxes },
  { name: "Data Engineering", icon: Database },
  // { name: "Airflow", icon: Workflow },
  // { name: "FastAPI", icon: Server },
  { name: "LLMs", icon: Brain },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="container mx-auto py-16 md:py-24">
      <h2 id="skills-title" className="font-display text-3xl md:text-4xl mb-6">Skills</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        A focused stack for modern, fast, and maintainable products. Always learning and iterating.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map(({ name, icon: Icon }) => (
          <div key={name} className="group rounded-lg border border-border/60 bg-card/40 p-4 hover-scale">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary/60 ring-1 ring-border">
                <Icon className="text-foreground/80" />
              </span>
              <Badge variant="secondary" className="bg-secondary/50 text-foreground/90">
                {name}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
