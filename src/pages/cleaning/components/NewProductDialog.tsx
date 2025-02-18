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

interface NewProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const NewProductDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: NewProductDialogProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Producto de Limpieza</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre del Producto</Label>
            <Input
              {...register("name")}
              placeholder="Ej: Desinfectante multiusos"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Fabricante</Label>
            <Input
              {...register("manufacturer")}
              placeholder="Nombre del fabricante"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Concentración Recomendada</Label>
            <Input
              {...register("concentration")}
              placeholder="Ej: 10ml/L"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tiempo de Contacto</Label>
            <Input
              {...register("contact_time")}
              placeholder="Ej: 5 minutos"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Instrucciones de Seguridad</Label>
            <Textarea
              {...register("safety_instructions")}
              placeholder="Instrucciones detalladas de seguridad y manejo"
              required
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

export default NewProductDialog;
