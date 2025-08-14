import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const certs = [
  {
    title: "Teaching Assistant",
    institution: "IIMS College, Kathmandu, Nepal",
    year: "Nov 2024 - present",
    desc: " Modules taught: Data Science Principle, Data Visualization, Big Data Technology, Database System, Inferential Mathematics",
  },
  // {
  //   title: "AI Automation Freelancer",
  //   institution: "Coursera, DeepLearning.AI, Stanford University",
  //   year: "2024",
  //   desc: "Tools used: n8n, sup",
  // },
];

export default function Experiences() {
  return (
    <section id="certifications" aria-labelledby="certs-title" className="container mx-auto py-16 md:py-24">
      <h2 id="certs-title" className="font-display text-3xl md:text-4xl mb-6">Experiences</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Experiences over the year
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <Card key={c.title} className="bg-card/50 border-border/60 hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">{c.title}</CardTitle>
              <CardDescription>
                {c.institution} • {c.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
