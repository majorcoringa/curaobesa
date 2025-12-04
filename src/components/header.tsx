import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "#benefits", label: "Benefícios" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">CuraObesa</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button asChild>
            <Link href="https://pay.kiwify.com.br/RxjGUSq">Comprar Agora</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
