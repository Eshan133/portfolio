import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const certs = [
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera, DeepLearning.AI, Stanford University",
    year: "2025",
    desc: "Neural Networks and Deep Learning, Hyperparameter Tuning, Regularization and Optimization, Structuring Machine Learning Projects, Convolutional Neural Networks, Sequence Models",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera, DeepLearning.AI, Stanford University",
    year: "2024",
    desc: "Supervised Machine Learning: Regression and Classification, Advanced Learning Algorithm, Unsupervised Learning, Recommenders, Reinforcement Learning",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certs-title" className="container mx-auto py-16 md:py-24">
      <h2 id="certs-title" className="font-display text-3xl md:text-4xl mb-6">Certifications</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Recognitions that validate core competencies and continuous growth.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <Card key={c.title} className="bg-card/50 border-border/60 hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">{c.title}</CardTitle>
              <CardDescription>
                {c.issuer} • {c.year}
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
