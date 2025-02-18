import React from "react";
import { Card } from "@/components/ui/card";

const Schedules = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recolección Regular</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Residuos Orgánicos</p>
              <p className="text-sm text-gray-600">
                Lunes, Miércoles y Viernes - 8:00 AM
              </p>
            </div>
            <div>
              <p className="font-medium">Residuos Inorgánicos</p>
              <p className="text-sm text-gray-600">Martes y Jueves - 8:00 AM</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Servicios Especiales</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Residuos Peligrosos</p>
              <p className="text-sm text-gray-600">
                Último viernes de cada mes - 10:00 AM
              </p>
            </div>
            <div>
              <p className="font-medium">Saneamiento</p>
              <p className="text-sm text-gray-600">
                Según necesidad - Programar con 48h de anticipación
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contactos de Emergencia</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Servicio de Saneamiento</p>
            <p className="text-sm text-gray-600">Tel: (555) 123-4567</p>
            <p className="text-sm text-gray-600">
              Email: saneamiento@ejemplo.com
            </p>
          </div>
          <div>
            <p className="font-medium">Recolección de Residuos Peligrosos</p>
            <p className="text-sm text-gray-600">Tel: (555) 987-6543</p>
            <p className="text-sm text-gray-600">
              Email: peligrosos@ejemplo.com
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Schedules;
