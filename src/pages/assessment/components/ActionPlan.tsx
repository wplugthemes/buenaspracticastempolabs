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

const ActionPlan = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const { data: evaluations, error: evaluationsError } = await supabase
        .from("assessment_evaluations")
        .select(
          `
          *,
          item:assessment_items(*),
          category:assessment_items(assessment_categories(*))
        `,
        )
        .eq("status", "non_compliant");

      if (evaluationsError) throw evaluationsError;

      setItems(evaluations || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los elementos",
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
        <h2 className="text-lg font-semibold">Plan de Acción</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoría</TableHead>
            <TableHead>Requisito</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Límite</TableHead>
            <TableHead>Acciones Correctivas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.category?.name}</TableCell>
              <TableCell>{item.item?.requirement}</TableCell>
              <TableCell>
                <Badge variant="destructive">No Cumple</Badge>
              </TableCell>
              <TableCell>
                {item.due_date
                  ? new Date(item.due_date).toLocaleDateString()
                  : "No establecida"}
              </TableCell>
              <TableCell>{item.notes || "Sin acciones definidas"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActionPlan;
