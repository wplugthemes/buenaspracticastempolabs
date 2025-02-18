import React from "react";
import { Card } from "./ui/card";
import {
  Factory,
  Bug,
  Droplets,
  Trash2,
  GraduationCap,
  AlertTriangle,
  Sparkles,
  FileCheck,
  ClipboardCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSubscribed = user?.email === "odavaloshdz@gmail.com";
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">
            Sistema de Gestión de Calidad e Inocuidad
          </h1>
          <span className="text-sm text-gray-500">Hecho en México</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buenas Prácticas de Manufactura */}
          <Card
            className="p-6 bg-teal-600 text-white hover:bg-teal-700 transition-colors cursor-pointer"
            onClick={() => navigate("/hygiene")}
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

          {/* Control de Plagas */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/pest-control")}
          >
            <div className="flex items-start gap-4">
              <Bug className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">Control de Plagas</h3>
                <p className="text-sm text-gray-600">
                  Sistema integral de prevención y control de plagas
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>

          {/* Limpieza y Desinfección */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/cleaning")}
          >
            <div className="flex items-start gap-4">
              <Sparkles className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Limpieza y Desinfección
                </h3>
                <p className="text-sm text-gray-600">
                  Programas de saneamiento y limpieza
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>

          {/* Gestión de Residuos */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/waste")}
          >
            <div className="flex items-start gap-4">
              <Trash2 className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Gestión de Residuos
                </h3>
                <p className="text-sm text-gray-600">
                  Control y manejo de residuos
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>

          {/* Control del Agua */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/water")}
          >
            <div className="flex items-start gap-4">
              <Droplets className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">Control del Agua</h3>
                <p className="text-sm text-gray-600">
                  Gestión y monitoreo de agua según NOM-127
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>

          {/* Capacitación de Personal */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/training")}
          >
            <div className="flex items-start gap-4">
              <GraduationCap className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Capacitación de Personal
                </h3>
                <p className="text-sm text-gray-600">
                  Material didáctico y control de asistencia
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>

          {/* Control de Alérgenos */}
          <Card
            className={`p-6 ${isSubscribed ? "bg-white hover:bg-gray-50" : "bg-gray-100 opacity-70"} relative overflow-hidden cursor-pointer`}
            onClick={() => isSubscribed && navigate("/allergens")}
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-teal-600" />
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Control de Alérgenos
                </h3>
                <p className="text-sm text-gray-600">
                  Gestión de ingredientes alérgenos y sensitivos
                </p>
              </div>
            </div>
            {!isSubscribed && (
              <div className="absolute top-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 rounded">
                Requiere Suscripción
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
