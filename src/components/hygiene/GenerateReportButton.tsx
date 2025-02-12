import React from "react";
import { FileDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface GenerateReportButtonProps {
  onGenerateReport?: () => void;
  isGenerating?: boolean;
}

const GenerateReportButton = ({
  onGenerateReport = () => {},
  isGenerating = false,
}: GenerateReportButtonProps) => {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
              onClick={onGenerateReport}
              disabled={isGenerating}
            >
              <FileDown className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate PDF Report</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GenerateReportButton;
