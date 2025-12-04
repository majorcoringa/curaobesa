import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <section id="purchase" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-headline font-extrabold mb-4">
          Pronto para Mudar de Vida?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 mb-8">
          Chega de promessas vazias. Dê o primeiro passo real em direção à sua melhor versão. A transformação que você busca está a um clique de distância.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 mb-4 text-lg h-14 px-10" asChild>
          <Link href="https://pay.kiwify.com.br/RxjGUSq">Sim, Eu Quero o Acesso Agora!</Link>
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
          <ShieldCheck className="w-4 h-4" />
          <span>Compra 100% Segura | Garantia de 7 Dias</span>
        </div>
      </div>
    </section>
  );
}
