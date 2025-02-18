import React, { useState, useEffect } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

const Reports = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

      const categoriesWithStats = categoriesData.map((category) => {
        const categoryItems = itemsData.filter(
          (item) => item.category_id === category.id,
        );
        const compliantItems = categoryItems.filter((item) =>
          evaluationsData.find(
            (eval) => eval.item_id === item.id && eval.status === "compliant",
          ),
        );

        return {
          ...category,
          totalItems: categoryItems.length,
          compliantItems: compliantItems.length,
        };
      });

      setCategories(categoriesWithStats);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    // TODO: Implement PDF generation
    toast({
      title: "En desarrollo",
      description: "La generación de PDF estará disponible próximamente",
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const totalItems = categories.reduce((acc, cat) => acc + cat.totalItems, 0);
  const totalCompliant = categories.reduce(
    (acc, cat) => acc + cat.compliantItems,
    0,
  );
  const overallProgress = Math.round((totalCompliant / totalItems) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Resumen de Cumplimiento</h2>
        <Button onClick={handleGenerateReport}>
          <FileDown className="h-4 w-4 mr-2" />
          Generar PDF
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Progreso General</h3>
            <div className="flex items-center gap-4">
              <Progress value={overallProgress} className="flex-1" />
              <span className="text-sm text-gray-500">
                {overallProgress}% ({totalCompliant}/{totalItems})
              </span>
            </div>
          </div>

          <div className="grid gap-4 mt-6">
            {categories.map((category) => {
              const progress = Math.round(
                (category.compliantItems / category.totalItems) * 100,
              );

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">{category.name}</h4>
                    <span className="text-sm text-gray-500">
                      {category.compliantItems}/{category.totalItems}
                    </span>
                  </div>
                  <Progress value={progress} />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
