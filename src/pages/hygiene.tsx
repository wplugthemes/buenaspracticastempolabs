import React, { useState, useEffect } from "react";
import {
  getRequirements,
  updateRequirement,
  uploadPhoto,
  generatePDF,
} from "@/lib/db";
import { toast } from "@/components/ui/use-toast";
import TopNavBar from "@/components/layout/TopNavBar";
import ChecklistContainer from "@/components/hygiene/ChecklistContainer";
import ProgressFooter from "@/components/hygiene/ProgressFooter";
import GenerateReportButton from "@/components/hygiene/GenerateReportButton";
import type { HygieneRequirement } from "@/lib/types";

const HygienePage = () => {
  const [requirements, setRequirements] = useState<HygieneRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const loadRequirements = async () => {
      try {
        const data = await getRequirements();
        setRequirements(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load requirements",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRequirements();
  }, []);

  const completedItems = requirements.filter((req) => req.is_compliant).length;

  const handleRequirementUpdate = async (id: string, isCompliant: boolean) => {
    try {
      await updateRequirement(id, isCompliant);
      setRequirements((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, is_compliant: isCompliant } : req,
        ),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update requirement",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    try {
      const publicUrl = await uploadPhoto(file, id);
      setRequirements((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, photo_evidence: publicUrl } : req,
        ),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const pdfUrl = await generatePDF(requirements);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <main className="flex-1 overflow-hidden">
        <ChecklistContainer
          requirements={requirements}
          onRequirementUpdate={handleRequirementUpdate}
          onPhotoUpload={handlePhotoUpload}
        />
      </main>
      <GenerateReportButton
        onGenerateReport={handleGenerateReport}
        isGenerating={isGenerating}
      />
      <ProgressFooter
        totalItems={requirements.length}
        completedItems={completedItems}
      />
    </div>
  );
};

export default HygienePage;
