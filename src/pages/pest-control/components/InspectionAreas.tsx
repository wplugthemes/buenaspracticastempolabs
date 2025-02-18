import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import type { InspectionArea } from "@/lib/types/pest-control";
import NewAreaDialog from "./NewAreaDialog";

const InspectionAreas = () => {
  const [areas, setAreas] = useState<InspectionArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    try {
      const { data, error } = await supabase
        .from("pest_inspection_areas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAreas(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las áreas de inspección",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewArea = async (area: Partial<InspectionArea>) => {
    try {
      const { error } = await supabase
        .from("pest_inspection_areas")
        .insert([area]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Área de inspección creada correctamente",
      });

      loadAreas();
      setShowNewDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el área de inspección",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Áreas de Inspección</h2>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Área
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Nivel de Riesgo</TableHead>
            <TableHead>Fecha de Creación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area.id}>
              <TableCell>{area.name}</TableCell>
              <TableCell>{area.description}</TableCell>
              <TableCell>{area.risk_level}</TableCell>
              <TableCell>
                {new Date(area.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewAreaDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSubmit={handleNewArea}
      />
    </div>
  );
};

export default InspectionAreas;
