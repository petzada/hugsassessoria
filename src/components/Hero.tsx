import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import InputMask from "react-input-mask";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-bg.jpg";
import { z } from "zod";

const leadFormSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  
  phone: z.string()
    .trim()
    .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
  
  email: z.string()
    .trim()
    .max(100, "Email muito longo")
    .email("Email inválido")
    .toLowerCase(),
  
  service: z.enum(["veiculo", "imovel", "pessoal"], {
    errorMap: () => ({ message: "Selecione um tipo de serviço" })
  }),
  
  installmentValue: z.string()
    .trim()
    .regex(/^R\$\s\d{1,7}$/, "Valor inválido")
    .refine(
      (val) => {
        const num = parseInt(val.replace(/\D/g, ''));
        return num > 0 && num < 10000000;
      },
      "Valor deve estar entre R$ 1 e R$ 9.999.999"
    )
});

const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    installmentValue: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = leadFormSchema.safeParse(formData);
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    const validatedData = result.data;

    try {
      const { error } = await supabase.from("leads").insert({
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        service: validatedData.service,
        installment_value: validatedData.installmentValue,
      });

      if (error) {
        if (import.meta.env.DEV) {
          console.error("Lead submission error:", error.message);
        }
        throw error;
      }

      toast.success("Solicitação enviada! Entraremos em contato em breve.");
      setFormData({ name: "", phone: "", email: "", service: "", installmentValue: "" });
    } catch (error: any) {
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 bg-gradient-to-br from-primary/5 to-background w-full overflow-hidden">
      <div className="absolute inset-0 opacity-30 w-full">
        <img src={heroImage} alt="Background" className="w-full h-full object-cover" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-center max-w-2xl">
              Revisão de juros de veículos, imóveis e empréstimo pessoal
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-xl">
              Atendimento rápido, soluções simplificadas e garantia total de serviço.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
              <Button asChild size="lg" className="bg-success hover:bg-success/90 w-full sm:w-auto">
                <a href="https://wa.me/5511953539103" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Fale com um especialista
                </a>
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                const element = document.querySelector(".bg-card");
                if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
              }} className="w-full sm:w-auto">
                Solicitar análise gratuita
              </Button>
            </div>
          </div>
          
          <div className="bg-card p-6 lg:p-8 rounded-2xl shadow-lg border w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-foreground text-center">Solicite sua análise gratuita</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Digite seu nome"
                  maxLength={100}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  maxLength={100}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="service">Tipo de serviço</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veiculo">Financiamento de veículos</SelectItem>
                    <SelectItem value="imovel">Financiamento de imóveis</SelectItem>
                    <SelectItem value="pessoal">Empréstimo pessoal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="installmentValue">Qual valor da sua parcela?</Label>
                <InputMask
                  mask="R$ 9999999"
                  maskChar=""
                  value={formData.installmentValue}
                  onChange={(e) => setFormData({ ...formData, installmentValue: e.target.value })}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      id="installmentValue"
                      placeholder="R$ 0"
                      className="mt-1"
                    />
                  )}
                </InputMask>
              </div>
              
              <Button type="submit" className="w-full bg-primary-dark hover:bg-primary-dark/90">
                Enviar solicitação
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Atendimento 100% seguro</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
