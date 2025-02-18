import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Checklist from "./components/Checklist";
import Reports from "./components/Reports";
import ActionPlan from "./components/ActionPlan";

const AssessmentPage = () => {
  const documentInfo = {
    code: "HS-ADC-PR-005",
    edition: "01",
    date: "04-SEP-2023",
    nextReview: "03-MAR-25",
    replaces: "A-00",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 border-b">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Autoevaluación BPM</h1>
          <div className="text-sm text-gray-600">
            <h2 className="font-medium mb-2">
              SISTEMA DE GESTIÓN DE CALIDAD E INOCUIDAD
            </h2>
            <p className="mb-1">
              GUÍA DE BUENAS PRÁCTICAS DE HIGIENE EN ESTABLECIMIENTOS
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

      <div className="max-w-7xl mx-auto p-8">
        <Tabs defaultValue="checklist" className="space-y-6">
          <TabsList>
            <TabsTrigger value="checklist">Lista de Verificación</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="action-plan">Plan de Acción</TabsTrigger>
          </TabsList>

          <Card className="p-6">
            <TabsContent value="checklist">
              <Checklist />
            </TabsContent>

            <TabsContent value="reports">
              <Reports />
            </TabsContent>

            <TabsContent value="action-plan">
              <ActionPlan />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default AssessmentPage;
