import React from "react";
import { Camera, Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ChecklistItemProps {
  requirement: string;
  is_compliant?: boolean;
  onStatusChange?: (status: boolean) => void;
  onPhotoUpload?: (file: File) => void;
  photo_evidence?: string;
}

const ChecklistItem = ({
  requirement = "Sample hygiene requirement",
  is_compliant = false,
  onStatusChange = () => {},
  onPhotoUpload = () => {},
  photo_evidence = "",
}: ChecklistItemProps) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div className="w-full p-4 mb-4 rounded-lg border bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{requirement}</p>
        </div>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={is_compliant}
                    onCheckedChange={onStatusChange}
                  />
                  {is_compliant ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle compliance status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2">
            {photo_evidence && (
              <img
                src={photo_evidence}
                alt="Evidence"
                className="h-10 w-10 rounded object-cover"
              />
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative overflow-hidden"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handlePhotoUpload}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload photo evidence</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistItem;
