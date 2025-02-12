import React from "react";
import { Progress } from "../ui/progress";

interface ProgressFooterProps {
  totalItems?: number;
  completedItems?: number;
}

const ProgressFooter = ({
  totalItems = 10,
  completedItems = 0,
}: ProgressFooterProps) => {
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-sm font-medium text-gray-600">
            {completedItems} / {totalItems}
          </span>
          <span className="text-sm font-medium text-gray-900">
            ({progressPercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressFooter;
