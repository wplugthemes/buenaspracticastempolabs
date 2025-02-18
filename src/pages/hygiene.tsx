import React, { useEffect, useState } from "react";
import TopNavBar from "@/components/layout/TopNavBar";
import ChecklistContainer from "@/components/hygiene/ChecklistContainer";
import GenerateReportButton from "@/components/hygiene/GenerateReportButton";
import ProgressFooter from "@/components/hygiene/ProgressFooter";
import {
  getRequirements,
  updateRequirement,
  uploadPhoto,
  generatePDF,
} from "@/lib/db";
import { toast } from "@/components/ui/use-toast";
import type { HygieneRequirement } from "@/lib/types";

const HygienePage = () => {
  const [requirements, setRequirements] = useState<HygieneRequirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const documentInfo = {
    code: "HS-ADC-PR-002",
    edition: "01",
    date: "04-SEP-2023",
    nextReview: "03-MAR-25",
    replaces: "A-00",
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    try {
      const data = await getRequirements();
      setRequirements(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los requisitos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequirementUpdate = async (id: string, isCompliant: boolean) => {
    try {
      await updateRequirement(id, isCompliant);
      setRequirements(
        requirements.map((req) =>
          req.id === id ? { ...req, is_compliant: isCompliant } : req,
        ),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el requisito",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    try {
      const url = await uploadPhoto(file, id);
      setRequirements(
        requirements.map((req) =>
          req.id === id ? { ...req, photo_evidence: url } : req,
        ),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir la foto",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const url = await generatePDF(requirements);
      window.open(url, "_blank");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el reporte",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const completedItems = requirements.filter((req) => req.is_compliant).length;

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="bg-white p-6 border-b">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Higiene del Personal</h1>
          <div className="text-sm text-gray-600">
            <h2 className="font-medium mb-2">
              SISTEMA DE GESTIÓN DE CALIDAD E INOCUIDAD
            </h2>
            <p className="mb-1">
              PROCEDIMIENTO PARA LA APLICACIÓN DE BUENAS PRÁCTICAS DE
              MANUFACTURA
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p>CÓDIGO: {documentInfo.code}</p>
                <p>ELABORACIÓN: {documentInfo.date}</p>
                <p>PRÓXIMA REVISIÓN: {documentInfo.nextReview}</p>
              </div>
              <div className="text-right">
                <p>EDICIÓN: {documentInfo.edition}</p>
                <p>SUSTITUYE A: {documentInfo.replaces}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-hidden bg-gray-50">
        <ChecklistContainer
          requirements={requirements}
          onRequirementUpdate={handleRequirementUpdate}
          onPhotoUpload={handlePhotoUpload}
        />
        <GenerateReportButton
          onGenerateReport={handleGenerateReport}
          isGenerating={isGenerating}
        />
        <ProgressFooter
          totalItems={requirements.length}
          completedItems={completedItems}
        />
      </main>
    </div>
  );
};

export default HygienePage;
