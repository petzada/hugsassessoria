import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const FAQ = () => {
  const faqs = [{
    question: "Como funciona o nosso processo?",
    answer: "Primeiro, você entra em contato conosco e nos envia os documentos do seu contrato. Nossa equipe faz uma análise detalhada para identificar possíveis irregularidades nos juros. Se encontrarmos juros abusivos, entramos com a ação para redução. Você só paga pelos nossos serviços se conseguirmos a redução."
  }, {
    question: "Tenho segurança jurídica?",
    answer: "Sim! Trabalhamos com advogados especializados e todo o processo é feito dentro da legalidade. Todos os contratos são analisados por profissionais qualificados e as ações são baseadas em jurisprudência consolidada."
  }, {
    question: "Em quanto tempo tenho um retorno sobre a avaliação?",
    answer: "A análise inicial é feita em até 48 horas úteis após o recebimento da documentação completa. Após a análise, você receberá um retorno com o parecer e as próximas etapas do processo."
  }, {
    question: "É burocrático?",
    answer: "Não! Trabalhamos para tornar o processo o mais simples possível. Você só precisa nos enviar cópias dos documentos do contrato, e nossa equipe cuida de todo o resto. Mantemos você informado em cada etapa do processo."
  }];
  return <section id="duvidas" className="py-20 bg-muted/30 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Dúvidas frequentes</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>;
};
export default FAQ;