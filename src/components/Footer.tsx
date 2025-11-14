import { MapPin, Clock, MessageCircle, Phone } from "lucide-react";
import hugsLogo from "@/assets/hugs-logo.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <footer id="contato" className="bg-primary-dark text-primary-foreground w-full overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-full">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <img src={hugsLogo} alt="Hugs Assessoria" className="h-12 md:h-16 w-auto mb-4 mx-auto md:mx-0" />
            <p className="opacity-90">
              Especialistas em revisão de juros abusivos, trabalhando para garantir que você pague apenas o justo.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Links úteis</h4>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
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
          
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 flex flex-col items-center md:items-start">
              <li className="flex items-start gap-2">
                <MessageCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">WhatsApp Especialista:</p>
                  <a href="https://wa.me/5511953539103" className="opacity-90 hover:opacity-100">
                    (11) 95353-9103
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">SAC:</p>
                  <a href="tel:11958264333" className="opacity-90 hover:opacity-100">
                    (11) 95826-4333
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="opacity-90">Suzano - SP</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
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
    </footer>;
};
export default Footer;