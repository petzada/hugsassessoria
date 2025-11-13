import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImage}
              alt="Cliente satisfeito"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Sobre a Hugs Assessoria
            </h2>
            <p className="text-lg opacity-90">
              Somos especialistas na redução de juros em três modalidades, garantindo a transparência nas negociações e a satisfação de todos os atendimentos.
            </p>
            <p className="text-lg opacity-90">
              Nossa equipe é formada por profissionais experientes que trabalham incansavelmente para garantir que você pague apenas o justo pelo seu financiamento.
            </p>
            <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
              Saiba mais sobre nossa história
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
