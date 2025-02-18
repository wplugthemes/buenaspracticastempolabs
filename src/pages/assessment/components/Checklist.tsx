import React, { useState, useEffect } from "react";
import { Plus, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

const Checklist = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("assessment_categories")
        .select("*")
        .order("order_index");

      if (categoriesError) throw categoriesError;

      const { data: itemsData, error: itemsError } = await supabase
        .from("assessment_items")
        .select("*");

      if (itemsError) throw itemsError;

      const { data: evaluationsData, error: evaluationsError } = await supabase
        .from("assessment_evaluations")
        .select("*");

      if (evaluationsError) throw evaluationsError;

      const categoriesWithItems = categoriesData.map((category) => ({
        ...category,
        items: itemsData
          .filter((item) => item.category_id === category.id)
          .map((item) => ({
            ...item,
            evaluation: evaluationsData.find(
              (eval) => eval.item_id === item.id,
            ),
          })),
      }));

      setCategories(categoriesWithItems);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los elementos de evaluación",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (itemId: string, status: string) => {
    try {
      const { error } = await supabase.from("assessment_evaluations").upsert({
        item_id: itemId,
        status,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      loadCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = async (itemId: string, file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${itemId}-${Math.random()}.${fileExt}`;
      const filePath = `assessment-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("photos").getPublicUrl(filePath);

      const { error } = await supabase.from("assessment_evaluations").upsert({
        item_id: itemId,
        photo_evidence: publicUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      loadCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir la foto",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="space-y-4">
        {categories.map((category) => {
          const totalItems = category.items.length;
          const completedItems = category.items.filter(
            (item) => item.evaluation?.status === "compliant",
          ).length;
          const progress = Math.round((completedItems / totalItems) * 100);

          return (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="px-4">
                <div className="flex items-center justify-between w-full">
                  <span>{category.name}</span>
                  <div className="flex items-center gap-4">
                    <Progress value={progress} className="w-24" />
                    <span className="text-sm text-gray-500">
                      {completedItems}/{totalItems}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.requirement}</p>
                        {item.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {item.evaluation?.photo_evidence && (
                          <img
                            src={item.evaluation.photo_evidence}
                            alt="Evidence"
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <Button
                          variant="outline"
                          size="icon"
                          className="relative overflow-hidden"
                          onClick={() =>
                            document
                              .getElementById(`photo-upload-${item.id}`)
                              ?.click()
                          }
                        >
                          <Camera className="h-4 w-4" />
                          <input
                            type="file"
                            id={`photo-upload-${item.id}`}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handlePhotoUpload(item.id, e.target.files[0])
                            }
                          />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.evaluation?.status === "compliant"}
                            onCheckedChange={(checked) =>
                              handleStatusChange(
                                item.id,
                                checked ? "compliant" : "non_compliant",
                              )
                            }
                          />
                          <Badge
                            variant={
                              item.evaluation?.status === "compliant"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {item.evaluation?.status === "compliant"
                              ? "Cumple"
                              : "No Cumple"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Checklist;
