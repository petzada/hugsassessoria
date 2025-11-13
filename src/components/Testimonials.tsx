import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      city: "São Paulo - SP",
      text: "Consegui reduzir mais de R$ 15.000 em juros do meu financiamento de veículo. Atendimento excelente e muito profissional!",
      rating: 5,
    },
    {
      name: "João Santos",
      city: "Rio de Janeiro - RJ",
      text: "Estava pagando juros abusivos no meu financiamento imobiliário. A Hugs conseguiu reduzir significativamente o valor mensal. Recomendo!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      city: "Belo Horizonte - MG",
      text: "Processo muito simples e rápido. Em menos de uma semana já tinha a resposta positiva. Estou muito satisfeita com o resultado!",
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-background w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.city}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
