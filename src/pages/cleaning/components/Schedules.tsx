import React from "react";
import { Card } from "@/components/ui/card";

const Schedules = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Limpieza Regular</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Áreas de Producción</p>
              <p className="text-sm text-gray-600">
                Diario - Al finalizar cada turno
              </p>
            </div>
            <div>
              <p className="font-medium">Áreas de Almacenamiento</p>
              <p className="text-sm text-gray-600">Semanal - Sábados 8:00 AM</p>
            </div>
            <div>
              <p className="font-medium">Equipos y Utensilios</p>
              <p className="text-sm text-gray-600">Después de cada uso</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Limpieza Profunda</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Sanitización General</p>
              <p className="text-sm text-gray-600">
                Mensual - Último domingo 6:00 AM
              </p>
            </div>
            <div>
              <p className="font-medium">Mantenimiento Preventivo</p>
              <p className="text-sm text-gray-600">
                Trimestral - Según calendario
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Proveedores Recomendados</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Productos Químicos Industriales</p>
            <p className="text-sm text-gray-600">Tel: (555) 123-4567</p>
            <p className="text-sm text-gray-600">
              Email: ventas@quimicosindustriales.com
            </p>
          </div>
          <div>
            <p className="font-medium">Servicios de Sanitización</p>
            <p className="text-sm text-gray-600">Tel: (555) 987-6543</p>
            <p className="text-sm text-gray-600">
              Email: contacto@sanitizacion.com
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Schedules;
