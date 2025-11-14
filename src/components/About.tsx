import aboutImage from "@/assets/about-new-image.jpg";
import { Shield, Award, CheckCircle2, TrendingDown } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-primary text-primary-foreground w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImage}
              alt="Cliente satisfeito"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
              Sobre a Hugs Assessoria
            </h2>
            <p className="text-lg opacity-90 text-center md:text-left">
              Somos especialistas na redução de juros em três modalidades, garantindo a transparência nas negociações e a satisfação de todos os atendimentos.
            </p>
            <p className="text-lg opacity-90 text-center md:text-left">
              Nossa equipe é formada por profissionais experientes que trabalham incansavelmente para garantir que você pague apenas o justo pelo seu financiamento.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              <div className="flex flex-col items-center gap-2 p-4 bg-background/10 rounded-lg">
                <Shield className="w-10 h-10" />
                <span className="text-sm text-center font-semibold">100% Seguro</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-background/10 rounded-lg">
                <Award className="w-10 h-10" />
                <span className="text-sm text-center font-semibold">Certificado</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-background/10 rounded-lg">
                <CheckCircle2 className="w-10 h-10" />
                <span className="text-sm text-center font-semibold">Aprovado</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-background/10 rounded-lg">
                <TrendingDown className="w-10 h-10" />
                <span className="text-sm text-center font-semibold">Juros Reduzidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
