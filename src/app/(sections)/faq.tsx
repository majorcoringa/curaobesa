import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O produto é seguro para qualquer pessoa?",
    answer: "Sim, os 7 Rituais da Cura para Acabar com a Obesidade foram desenvolvidos com base em práticas naturais e seguras. No entanto, recomendamos sempre consultar um médico antes de iniciar qualquer novo programa de saúde, especialmente se você tiver condições pré-existentes."
  },
  {
    question: "Em quanto tempo consigo ver os primeiros resultados?",
    answer: "Os resultados variam de pessoa para pessoa, mas muitos de nossos clientes relatam sentir mais energia e bem-estar já na primeira semana. Resultados de perda de peso mais significativos costumam ser visíveis a partir do primeiro mês de prática consistente."
  },
  {
    question: "Preciso fazer dietas muito restritivas ou exercícios intensos?",
    answer: "Não. O foco do programa é a reeducação e a criação de uma nova relação com seu corpo e mente. Os rituais incentivam uma alimentação consciente e movimentos corporais prazerosos, sem a necessidade de dietas extremas ou exercícios exaustivos."
  },
  {
    question: "E se eu comprar e não gostar do produto?",
    answer: "Sua satisfação é nossa prioridade. Oferecemos uma garantia de 7 dias. Se por qualquer motivo você não estiver satisfeito com o produto, basta entrar em contato conosco dentro desse prazo para receber o reembolso total do seu investimento."
  }
];

export default function Faq() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-muted-foreground">
            Tirando todas as suas dúvidas para que você comece sua jornada com total confiança.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-headline text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
