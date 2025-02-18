import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InspectionArea } from "@/lib/types/pest-control";

interface NewAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<InspectionArea>) => void;
}

const NewAreaDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: NewAreaDialogProps) => {
  const { register, handleSubmit, reset } = useForm<Partial<InspectionArea>>();

  const onSubmitForm = (data: Partial<InspectionArea>) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Área de Inspección</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre del Área</Label>
            <Input
              {...register("name")}
              placeholder="Ej: Almacén de Materias Primas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Input
              {...register("description")}
              placeholder="Descripción del área y sus características"
            />
          </div>

          <div className="space-y-2">
            <Label>Nivel de Riesgo</Label>
            <Select
              onValueChange={(value) =>
                register("risk_level").onChange({
                  target: { value: parseInt(value) },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar nivel de riesgo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Muy Bajo</SelectItem>
                <SelectItem value="2">2 - Bajo</SelectItem>
                <SelectItem value="3">3 - Medio</SelectItem>
                <SelectItem value="4">4 - Alto</SelectItem>
                <SelectItem value="5">5 - Muy Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAreaDialog;
