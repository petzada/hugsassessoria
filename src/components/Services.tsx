import { Car, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Car,
      title: "Financiamento de veículos",
      description: "Reduzimos os juros do seu financiamento de veículos sem complicação",
    },
    {
      icon: Home,
      title: "Financiamento de imóveis",
      description: "Garantimos a redução do valor do seu financiamento imobiliário",
    },
    {
      icon: DollarSign,
      title: "Empréstimo pessoal",
      description: "Soluções rápidas para a redução dos juros de seu crédito pessoal",
    },
  ];

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos serviços
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary-dark hover:bg-primary-dark/90">
            <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer">
              Solicite sua análise agora
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
