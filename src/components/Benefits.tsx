import { DollarSign, HelpCircle, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Benefits = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Garantia de redução",
      description: "Só cobramos se conseguirmos reduzir seus juros",
    },
    {
      icon: HelpCircle,
      title: "Sem complicações",
      description: "Processo simples e transparente do início ao fim",
    },
    {
      icon: Phone,
      title: "Serviços rápidos",
      description: "Análise e retorno em até 48 horas úteis",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher a Hugs Assessoria?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-lg py-3 px-6 bg-primary/10 text-primary border-primary/20">
            Mais de 1 milhão de reais em juros reduzidos
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
