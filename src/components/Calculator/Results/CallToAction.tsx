import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, TreePine, BookOpen } from "lucide-react";

export const CallToAction = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-[#2F855A]/5 to-[#4C51BF]/5">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-title">
          Want a More Detailed Analysis?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get a detailed analysis of your carbon footprint, personalized AI recommendations, 
          and actionable insights. Join us to create a sustainable future!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="flex flex-col items-center space-y-2 p-3">
            <Award className="h-6 w-6 text-[#2F855A]" />
            <h4 className="font-semibold">Detailed Analysis</h4>
            <p className="text-sm text-gray-600">Personalized recommendations and insights</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3">
            <TreePine className="h-6 w-6 text-[#4C51BF]" />
            <h4 className="font-semibold">Project Suggestions</h4>
            <p className="text-sm text-gray-600">Local tree planting and renewable energy initiatives</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-3">
            <BookOpen className="h-6 w-6 text-[#F6E05E]" />
            <h4 className="font-semibold">Educational Content</h4>
            <p className="text-sm text-gray-600">Access eco-friendly product recommendations</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic">
          * This calculator provides estimates based on average emission factors in Nigeria
        </p>

        <Button 
          className="bg-eco-primary hover:bg-eco-primary/90 rounded-full"
        >
          Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};