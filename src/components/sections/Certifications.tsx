import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Certification = {
  title: string;
  issuer: string;
  year: string;
  desc: string;
  link?: string;
};

const certs: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera, DeepLearning.AI, Stanford University",
    year: "2025",
    desc: "Neural Networks and Deep Learning, Hyperparameter Tuning, Regularization and Optimization, Structuring Machine Learning Projects, Convolutional Neural Networks, Sequence Models",
    link: "https://www.coursera.org/account/accomplishments/specialization/SWASUYS14Z36",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera, DeepLearning.AI, Stanford University",
    year: "2024",
    desc: "Supervised Machine Learning: Regression and Classification, Advanced Learning Algorithm, Unsupervised Learning, Recommenders, Reinforcement Learning",
    link: "https://www.coursera.org/account/accomplishments/specialization/ASKXCPHBBLXM",
  },
  {
    title: "Oracle Cloud Infrastructure 2024 Certified Foundations Associate",
    issuer: "Oracle University",
    year: "2024",
    desc: "Covers OCI core services, governance, security, networking, storage, and basic cloud architecture concepts.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=81E8F1E936873B33E8F55432B141013C877C7A043CC2EA1996F4758C3910C930",
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
                {c.issuer} | {c.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{c.desc}</p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                >
                  View credential
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
