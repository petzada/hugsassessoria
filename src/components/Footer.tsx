import { MapPin, Clock, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contato" className="bg-primary-dark text-primary-foreground w-full overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-full">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Hugs Assessoria</h3>
            <p className="opacity-90">
              Especialistas em revisão de juros abusivos, trabalhando para garantir que você pague apenas o justo.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links úteis</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection("sobre")} className="opacity-90 hover:opacity-100 transition-opacity">
                  Sobre nós
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("servicos")} className="opacity-90 hover:opacity-100 transition-opacity">
                  Serviços
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("depoimentos")} className="opacity-90 hover:opacity-100 transition-opacity">
                  Depoimentos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contato")} className="opacity-90 hover:opacity-100 transition-opacity">
                  Contato
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp Especialista:</p>
                  <a href="https://wa.me/5511953539103" className="opacity-90 hover:opacity-100">
                    (11) 95353-9103
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">SAC:</p>
                  <a href="tel:1195353-9103" className="opacity-90 hover:opacity-100">
                    (11) 95353-9103
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="opacity-90">São Paulo - SP</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Horário de atendimento:</p>
                  <p className="opacity-90">Segunda a Sexta: 9h às 18h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="opacity-90">
            © {currentYear} Hugs Assessoria. Todos os direitos reservados.
          </p>
          <p className="text-sm opacity-75 mt-2">
            Este site utiliza cookies para melhorar sua experiência de navegação.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
