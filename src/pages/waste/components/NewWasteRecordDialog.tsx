import React, { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import type { WasteRecord, WasteType } from "@/lib/types/waste";

interface NewWasteRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<WasteRecord>) => void;
}

const NewWasteRecordDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: NewWasteRecordDialogProps) => {
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([]);
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<Partial<WasteRecord>>();
  const requiresSanitation = watch("requires_sanitation");

  useEffect(() => {
    loadWasteTypes();
  }, []);

  const loadWasteTypes = async () => {
    const { data } = await supabase
      .from("waste_types")
      .select("*")
      .order("name");
    if (data) setWasteTypes(data);
  };

  const onSubmitForm = (data: Partial<WasteRecord>) => {
    onSubmit({
      ...data,
      disposal_date: new Date().toISOString(),
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Registro de Eliminación</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Residuo</Label>
            <Select
              onValueChange={(value) =>
                register("waste_type_id").onChange({
                  target: { value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de residuo" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input
                type="number"
                {...register("quantity")}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Unidad</Label>
              <Select
                onValueChange={(value) =>
                  register("unit").onChange({
                    target: { value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar unidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                  <SelectItem value="l">Litros (L)</SelectItem>
                  <SelectItem value="m3">Metros cúbicos (m³)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="requires-sanitation"
              onCheckedChange={(checked) =>
                setValue("requires_sanitation", checked)
              }
            />
            <Label htmlFor="requires-sanitation">Requiere Saneamiento</Label>
          </div>

          {requiresSanitation && (
            <div className="space-y-2">
              <Label>Estado de Saneamiento</Label>
              <Select
                onValueChange={(value) =>
                  register("sanitation_status").onChange({
                    target: { value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="programado">Programado</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea
              {...register("notes")}
              placeholder="Notas adicionales sobre la eliminación"
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

export default NewWasteRecordDialog;
