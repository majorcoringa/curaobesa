export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} CuraObesa. Todos os direitos reservados.
        </p>
        <div className="text-sm mt-4 md:mt-0">
          Este produto não substitui o parecer médico profissional.
        </div>
      </div>
    </footer>
  );
}
