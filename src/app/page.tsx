import Header from "@/components/header";
import Hero from "@/app/(sections)/hero";
import Benefits from "@/app/(sections)/benefits";
import Testimonials from "@/app/(sections)/testimonials";
import Faq from "@/app/(sections)/faq";
import Cta from "@/app/(sections)/cta";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
