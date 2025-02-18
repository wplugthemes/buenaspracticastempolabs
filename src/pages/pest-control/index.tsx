import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import InspectionAreas from "./components/InspectionAreas";
import Providers from "./components/Providers";
import Inspections from "./components/Inspections";

const PestControlPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Control de Plagas</h1>
        </div>

        <Tabs defaultValue="areas" className="space-y-6">
          <TabsList>
            <TabsTrigger value="areas">Áreas de Inspección</TabsTrigger>
            <TabsTrigger value="providers">Proveedores</TabsTrigger>
            <TabsTrigger value="inspections">Inspecciones</TabsTrigger>
          </TabsList>

          <Card className="p-6">
            <TabsContent value="areas">
              <InspectionAreas />
            </TabsContent>

            <TabsContent value="providers">
              <Providers />
            </TabsContent>

            <TabsContent value="inspections">
              <Inspections />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default PestControlPage;
