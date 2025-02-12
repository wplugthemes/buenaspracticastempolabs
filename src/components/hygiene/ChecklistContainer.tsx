import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import ChecklistItem from "./ChecklistItem";

interface HygieneRequirement {
  id: string;
  requirement: string;
  is_compliant: boolean;
  photo_evidence?: string;
}

interface ChecklistContainerProps {
  requirements?: HygieneRequirement[];
  onRequirementUpdate?: (id: string, isCompliant: boolean) => void;
  onPhotoUpload?: (id: string, file: File) => void;
}

const ChecklistContainer = ({
  requirements = [
    {
      id: "1",
      requirement: "Personal must wear clean uniforms",
      is_compliant: false,
    },
  ],
  onRequirementUpdate = () => {},
  onPhotoUpload = () => {},
}: ChecklistContainerProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-4">
      <ScrollArea className="h-full w-full rounded-md border bg-white p-4">
        <div className="space-y-4">
          {requirements.map((req) => (
            <ChecklistItem
              key={req.id}
              requirement={req.requirement}
              isCompliant={req.is_compliant}
              photoEvidence={req.photo_evidence}
              onStatusChange={(status) => onRequirementUpdate(req.id, status)}
              onPhotoUpload={(file) => onPhotoUpload(req.id, file)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChecklistContainer;
