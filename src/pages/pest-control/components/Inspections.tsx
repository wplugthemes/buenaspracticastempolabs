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
import type { PestInspection } from "@/lib/types/pest-control";

const Inspections = () => {
  const [inspections, setInspections] = useState<PestInspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const { data, error } = await supabase
        .from("pest_inspections")
        .select("*")
        .order("inspection_date", { ascending: false });

      if (error) throw error;
      setInspections(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las inspecciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Inspecciones</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Inspección
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Área</TableHead>
            <TableHead>Tipo de Plaga</TableHead>
            <TableHead>Evidencia</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell>
                {new Date(inspection.inspection_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{inspection.area_id}</TableCell>
              <TableCell className="capitalize">
                {inspection.pest_type}
              </TableCell>
              <TableCell>
                {inspection.evidence_found ? "Encontrada" : "No encontrada"}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    inspection.status === "completado"
                      ? "bg-green-100 text-green-800"
                      : inspection.status === "en_proceso"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {inspection.status.replace("_", " ").toUpperCase()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Inspections;
