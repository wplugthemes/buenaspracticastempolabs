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

interface NewAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const NewAreaDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: NewAreaDialogProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Área o Equipo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              {...register("name")}
              placeholder="Ej: Área de producción"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              onValueChange={(value) =>
                register("type").onChange({
                  target: { value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Área</SelectItem>
                <SelectItem value="equipment">Equipo</SelectItem>
                <SelectItem value="utensil">Utensilio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Input
              {...register("location")}
              placeholder="Ej: Planta baja, sección A"
            />
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              {...register("description")}
              placeholder="Descripción detallada del área o equipo"
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

export default NewAreaDialog;
