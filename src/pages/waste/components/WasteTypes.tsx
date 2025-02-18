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
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import type { WasteType } from "@/lib/types/waste";
import NewWasteTypeDialog from "./NewWasteTypeDialog";

const WasteTypes = () => {
  const [types, setTypes] = useState<WasteType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const { data, error } = await supabase
        .from("waste_types")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTypes(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los tipos de residuos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewType = async (type: Partial<WasteType>) => {
    try {
      const { error } = await supabase.from("waste_types").insert([type]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Tipo de residuo creado correctamente",
      });

      loadTypes();
      setShowNewDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el tipo de residuo",
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
        <h2 className="text-lg font-semibold">Tipos de Residuos</h2>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Tipo
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Nivel de Riesgo</TableHead>
            <TableHead>Instrucciones de Eliminación</TableHead>
            <TableHead>Descripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    type.risk_level === "high" ? "destructive" : "secondary"
                  }
                >
                  {type.risk_level === "high" ? "Alto" : "Bajo"}
                </Badge>
              </TableCell>
              <TableCell>{type.disposal_instructions}</TableCell>
              <TableCell>{type.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewWasteTypeDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSubmit={handleNewType}
      />
    </div>
  );
};

export default WasteTypes;
