import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentType } from "@/lib/types/documents";

interface CodeGeneratorProps {
  companyPrefix?: string;
  onPrefixChange?: (prefix: string) => void;
  documentType: DocumentType;
  onTypeChange: (type: DocumentType) => void;
  sequenceNumber: string;
  onSequenceChange: (sequence: string) => void;
  preview: string;
}

export const CodeGenerator = ({
  companyPrefix = "",
  onPrefixChange = () => {},
  documentType,
  onTypeChange,
  sequenceNumber,
  onSequenceChange,
  preview,
}: CodeGeneratorProps) => {
  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: "PR", label: "Procedimiento" },
    { value: "IN", label: "Instructivo" },
    { value: "RG", label: "Registro" },
    { value: "FO", label: "Formato" },
    { value: "MA", label: "Manual" },
    { value: "PL", label: "Plan" },
    { value: "TA", label: "Tabla" },
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <Label>Company Prefix</Label>
        <Input
          value={companyPrefix}
          onChange={(e) => onPrefixChange(e.target.value.toUpperCase())}
          placeholder="Enter company prefix (e.g. GLO)"
          maxLength={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Document Type</Label>
        <Select value={documentType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sequence Number</Label>
        <Input
          value={sequenceNumber}
          onChange={(e) => onSequenceChange(e.target.value)}
          placeholder="Enter sequence number (e.g. 001)"
          maxLength={3}
        />
      </div>

      <div className="pt-4 border-t">
        <Label>Preview</Label>
        <p className="text-2xl font-mono mt-2">{preview}</p>
      </div>
    </Card>
  );
};
