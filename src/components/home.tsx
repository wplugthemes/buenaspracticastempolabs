import React from "react";
import { Card } from "./ui/card";
import { Factory, Bug, Truck, FileCheck, ClipboardCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">BPM App</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instalaciones y Equipos - Bloqueado */}
          <Card className="p-6 bg-gray-100 opacity-70 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <Factory className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Instalaciones y Equipos
                </h3>
                <p className="text-sm text-gray-600">
                  Gestión y mantenimiento de instalaciones y equipos
                  industriales
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
              Bloqueado
            </div>
          </Card>

          {/* Control de Plagas - Bloqueado */}
          <Card className="p-6 bg-gray-100 opacity-70 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <Bug className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">Control de Plagas</h3>
                <p className="text-sm text-gray-600">
                  Sistema integral de prevención de plagas
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
              Bloqueado
            </div>
          </Card>

          {/* Control de Proveedores - Bloqueado */}
          <Card className="p-6 bg-gray-100 opacity-70 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <Truck className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Control de Proveedores
                </h3>
                <p className="text-sm text-gray-600">
                  Gestión y evaluación de proveedores
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
              Bloqueado
            </div>
          </Card>

          {/* Trazabilidad - Bloqueado */}
          <Card className="p-6 bg-gray-100 opacity-70 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <FileCheck className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">Trazabilidad</h3>
                <p className="text-sm text-gray-600">
                  Sistema de trazabilidad de productos
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
              Bloqueado
            </div>
          </Card>

          {/* Buenas Prácticas de Manufactura - Activo */}
          <Card
            className="p-6 bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/hygiene")}
          >
            <div className="flex items-start gap-4">
              <ClipboardCheck className="h-8 w-8" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Buenas Prácticas de Manufactura
                </h3>
                <p className="text-sm opacity-90">
                  Procedimientos y normas de manufactura
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
