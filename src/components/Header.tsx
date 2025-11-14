import { Phone, Facebook, Instagram, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import hugsLogo from "@/assets/hugs-logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm w-full">
      <div className="bg-primary py-2 w-full">
        <div className="container mx-auto px-4 flex items-center justify-between md:justify-between text-primary-foreground text-sm max-w-full">
          <div className="flex items-center gap-2 justify-center md:justify-start flex-1 md:flex-initial">
            <Phone className="w-4 h-4" />
            <span className="text-center md:text-left">(11) 95353-9103</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="https://www.facebook.com/hugsassessoria" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/hugsreducaodejuros/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-background border-b w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-full">
          <div className="flex items-center">
            <img src={hugsLogo} alt="Hugs Assessoria" className="h-10 md:h-12 w-auto" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("servicos")} className="text-foreground hover:text-primary transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors">
              Sobre nós
            </button>
            <button onClick={() => scrollToSection("duvidas")} className="text-foreground hover:text-primary transition-colors">
              Dúvidas
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("servicos")} 
                className="text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection("sobre")} 
                className="text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Sobre nós
              </button>
              <button 
                onClick={() => scrollToSection("duvidas")} 
                className="text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Dúvidas
              </button>
              <button 
                onClick={() => scrollToSection("contato")} 
                className="text-foreground hover:text-primary transition-colors text-left py-2"
              >
                Contato
              </button>
              <Button asChild className="bg-success hover:bg-success/90 w-full">
                <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Fale pelo WhatsApp
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
