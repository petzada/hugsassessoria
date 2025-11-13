import { MessageCircle, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Button
        asChild
        size="lg"
        className="fixed bottom-6 right-4 sm:right-6 z-40 rounded-full w-14 h-14 shadow-lg bg-success hover:bg-success/90 animate-pulse"
      >
        <a
          href="https://wa.me/5511953539103"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </Button>

      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="lg"
          variant="outline"
          className="fixed bottom-24 right-4 sm:right-6 z-40 rounded-full w-14 h-14 shadow-lg"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </>
  );
};

export default FloatingWhatsApp;
