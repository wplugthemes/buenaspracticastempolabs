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
import NewAreaDialog from "./NewAreaDialog";

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    try {
      const { data, error } = await supabase
        .from("cleaning_areas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAreas(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las áreas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewArea = async (area) => {
    try {
      const { error } = await supabase.from("cleaning_areas").insert([area]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Área creada correctamente",
      });

      loadAreas();
      setShowNewDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el área",
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
        <h2 className="text-lg font-semibold">Áreas y Equipos</h2>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Área
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Ubicación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {areas.map((area) => (
            <TableRow key={area.id}>
              <TableCell>{area.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {area.type}
                </Badge>
              </TableCell>
              <TableCell>{area.description}</TableCell>
              <TableCell>{area.location}</TableCell>
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

export default Areas;
