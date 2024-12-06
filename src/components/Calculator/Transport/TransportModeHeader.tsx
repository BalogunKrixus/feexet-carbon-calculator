import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TransportModeHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-base font-semibold">
        How do you commute most often?
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              type="button" 
              className="cursor-help focus:outline-none focus:ring-2 focus:ring-eco-primary focus:ring-offset-2 rounded-full"
            >
              <Info className="h-4 w-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="top"
            sideOffset={5}
            className="touch-none"
          >
            <p className="max-w-xs">
              Select your primary mode of transportation for daily activities. 
              This helps us calculate your carbon footprint based on typical 
              Nigerian commuting patterns.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};