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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WasteType } from "@/lib/types/waste";

interface NewWasteTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<WasteType>) => void;
}

const NewWasteTypeDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: NewWasteTypeDialogProps) => {
  const { register, handleSubmit, reset } = useForm<Partial<WasteType>>();

  const onSubmitForm = (data: Partial<WasteType>) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Tipo de Residuo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              {...register("name")}
              placeholder="Ej: Residuos orgánicos"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Nivel de Riesgo</Label>
            <Select
              onValueChange={(value) =>
                register("risk_level").onChange({
                  target: { value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar nivel de riesgo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">
                  Alto - Riesgo Microbiológico
                </SelectItem>
                <SelectItem value="low">Bajo - Material Inerte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Instrucciones de Eliminación</Label>
            <Textarea
              {...register("disposal_instructions")}
              placeholder="Instrucciones detalladas para la eliminación segura"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              {...register("description")}
              placeholder="Descripción general del tipo de residuo"
            />
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

export default NewWasteTypeDialog;
