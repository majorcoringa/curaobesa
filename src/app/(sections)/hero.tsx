import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight mb-4 animate-fade-in-up">
          Descubra os 7 Rituais da Cura para Acabar com a Obesidade
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up animation-delay-300">
          Transforme sua vida, recupere sua saúde e autoestima com um método testado e comprovado que vai além da dieta.
        </p>
        <div className="animate-fade-in-up animation-delay-600">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="https://pay.kiwify.com.br/RxjGUSq">Quero Começar Minha Transformação</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
