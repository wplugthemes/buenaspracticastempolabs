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
import type { WasteRecord, WasteType } from "@/lib/types/waste";
import NewWasteRecordDialog from "./NewWasteRecordDialog";

interface WasteRecordWithType extends WasteRecord {
  waste_type: WasteType;
}

const WasteRecords = () => {
  const [records, setRecords] = useState<WasteRecordWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("waste_records")
        .select(
          `
          *,
          waste_type:waste_types(*)
        `,
        )
        .order("disposal_date", { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los registros",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecord = async (record: Partial<WasteRecord>) => {
    try {
      const { error } = await supabase.from("waste_records").insert([record]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Registro creado correctamente",
      });

      loadRecords();
      setShowNewDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el registro",
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
        <h2 className="text-lg font-semibold">Registros de Eliminación</h2>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Registro
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo de Residuo</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Requiere Saneamiento</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                {new Date(record.disposal_date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {record.waste_type.name}
                <Badge
                  variant={
                    record.waste_type.risk_level === "high"
                      ? "destructive"
                      : "secondary"
                  }
                  className="ml-2"
                >
                  {record.waste_type.risk_level === "high" ? "Alto" : "Bajo"}
                </Badge>
              </TableCell>
              <TableCell>
                {record.quantity} {record.unit}
              </TableCell>
              <TableCell>{record.requires_sanitation ? "Sí" : "No"}</TableCell>
              <TableCell>
                <Badge
                  variant={record.sanitation_status ? "default" : "secondary"}
                >
                  {record.sanitation_status || "Pendiente"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewWasteRecordDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSubmit={handleNewRecord}
      />
    </div>
  );
};

export default WasteRecords;
