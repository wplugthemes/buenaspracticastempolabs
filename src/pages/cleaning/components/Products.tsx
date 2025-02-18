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
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import NewProductDialog from "./NewProductDialog";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("cleaning_products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewProduct = async (product) => {
    try {
      const { error } = await supabase
        .from("cleaning_products")
        .insert([product]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Producto creado correctamente",
      });

      loadProducts();
      setShowNewDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el producto",
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
        <h2 className="text-lg font-semibold">Productos de Limpieza</h2>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Fabricante</TableHead>
            <TableHead>Concentración</TableHead>
            <TableHead>Tiempo de Contacto</TableHead>
            <TableHead>Instrucciones de Seguridad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.manufacturer}</TableCell>
              <TableCell>{product.concentration}</TableCell>
              <TableCell>{product.contact_time}</TableCell>
              <TableCell>{product.safety_instructions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewProductDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSubmit={handleNewProduct}
      />
    </div>
  );
};

export default Products;
