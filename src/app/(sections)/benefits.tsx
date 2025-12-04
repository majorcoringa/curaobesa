import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Scale, Dumbbell, BrainCircuit, Leaf } from "lucide-react";

const benefits = [
  {
    icon: <Scale className="w-10 h-10 text-primary" />,
    title: "Perda de Peso Saudável",
    description: "Emagreça de forma natural e sustentável, sem dietas restritivas e efeito sanfona."
  },
  {
    icon: <Dumbbell className="w-10 h-10 text-primary" />,
    title: "Mais Energia e Disposição",
    description: "Sinta seu corpo mais leve e sua mente mais ativa para as tarefas do dia a dia."
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "Saúde Mental Equilibrada",
    description: "Reduza a ansiedade e a compulsão alimentar, melhorando sua relação com a comida."
  },
  {
    icon: <Leaf className="w-10 h-10 text-primary" />,
    title: "Novos Hábitos de Vida",
    description: "Incorpore rituais poderosos que transformarão seu bem-estar de dentro para fora."
  }
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">O que você vai conquistar?</h2>
          <p className="text-lg text-muted-foreground">
            Os 7 Rituais da Cura são mais que um produto, são um novo caminho para uma vida plena e saudável.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                <CardDescription className="pt-2">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
