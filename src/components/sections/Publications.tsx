import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

type Publication = {
  title: string;
  venue: string;
  year: string;
  desc: string;
  link?: string;
  pdf?: string;
};

const publications: Publication[] = [
  {
    title: "Multi-Modal Hate Speech Detection",
    venue: "Workshop on Responsible AI",
    year: "2024",
    desc: "Explores jointly modeling text and image signals for robust hate speech classification with transformer encoders.",
    link: "https://github.com/Eshan133/MultiModel-Hate-Speech-Detection",
    pdf: "https://acl-bg.org/proceedings/2025/CASE%202025/pdf/2025.case-1.9.pdf",
  },
  
];

export default function Publications() {
  return (
    <section id="publications" aria-labelledby="publications-title" className="container mx-auto py-16 md:py-24">
      <h2 id="publications-title" className="font-display text-3xl md:text-4xl mb-6">Publications</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Writing and research focused on practical deep learning systems and responsible AI.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {publications.map((pub) => (
          <Card key={pub.title} className="bg-card/50 border-border/60 hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">{pub.title}</CardTitle>
              <CardDescription>
                {pub.venue} | {pub.year}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">{pub.desc}</p>
              {(pub.link || pub.pdf) && (
                <div className="flex flex-wrap gap-3">
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink size={16} /> Project repo
                    </a>
                  )}
                  {pub.pdf && (
                    <a
                      href={pub.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink size={16} /> Read paper (PDF)
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
