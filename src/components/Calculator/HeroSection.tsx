import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculator');
    calculatorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <img
          src="/lovable-uploads/b035a820-5d42-40d3-8956-4d2870f7ccf9.png"
          alt="Busy Nigerian street with yellow buses and crowds"
          className="w-full h-[600px] object-cover"
        />
      </div>
      <div className="relative z-20">
        <div className="w-full flex justify-center py-4">
          <img
            src="/lovable-uploads/3194298e-33db-422c-9c4e-79f8c60b15f6.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in drop-shadow-lg">
            Nigeria's Most Accurate Carbon Footprint Calculator
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in drop-shadow-md">
            Understanding your carbon footprint is the first step towards a sustainable future. Our intuitive calculator provides precise measurements tailored to Nigerian lifestyle and infrastructure.
          </p>
          <Button 
            className="bg-eco-primary hover:bg-eco-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
            onClick={scrollToCalculator}
          >
            Calculate Your Footprint
          </Button>
        </div>
      </div>
    </div>
  );
};