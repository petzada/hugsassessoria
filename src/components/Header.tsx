import { Phone, Facebook, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="bg-primary py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-primary-foreground text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>(11) 95353-9103</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            Hugs Assessoria
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors">
              Sobre nós
            </button>
            <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection("depoimentos")} className="text-foreground hover:text-primary transition-colors">
              Depoimentos
            </button>
            <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors">
              Contato
            </button>
            <Button asChild className="bg-success hover:bg-success/90">
              <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Fale pelo WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
