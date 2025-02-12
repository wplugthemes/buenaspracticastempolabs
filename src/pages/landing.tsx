import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText, Truck, BarChart } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <img src="/logo.svg" alt="BPM Logo" className="h-8 w-auto" />
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Inicio
              </a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Características
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Precios
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900"
              >
                Testimonios
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contacto
              </a>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Acceder a la App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Implementa BPM de manera
          <br />
          <span className="text-teal-600">fácil y eficiente</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Cumple con la NOM-251-SSA1 y asegura la calidad en tu producción
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => navigate("/login")}
          >
            Empieza Gratis
          </Button>
          <Button size="lg" variant="outline">
            Solicitar Demo
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Características Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ClipboardCheck className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Higiene del Personal
                </h3>
                <p className="text-gray-600 text-sm">
                  Monitoreo y registro detallado del cumplimiento de normas de
                  higiene personal.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <FileText className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Saneamiento de Equipos
                </h3>
                <p className="text-gray-600 text-sm">
                  Control y seguimiento del saneamiento de equipos y vehículos
                  de transporte.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Truck className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Trazabilidad</h3>
                <p className="text-gray-600 text-sm">
                  Sistema integral de trazabilidad y control de proveedores.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <BarChart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Reportes Automáticos
                </h3>
                <p className="text-gray-600 text-sm">
                  Generación automática de reportes y análisis de cumplimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Planes y Precios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Básico</h3>
              <p className="text-4xl font-bold mb-6">
                $999<span className="text-sm text-gray-600">/mes</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Hasta 5 usuarios
                </li>
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Módulos básicos
                </li>
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Soporte por email
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Seleccionar Plan
              </Button>
            </div>
            <div className="border rounded-lg p-8 bg-teal-50 border-teal-200 relative">
              <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Más Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Profesional</h3>
              <p className="text-4xl font-bold mb-6">
                $1,999<span className="text-sm text-gray-600">/mes</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Usuarios ilimitados
                </li>
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Todos los módulos
                </li>
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  Soporte prioritario 24/7
                </li>
                <li className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-teal-600 mr-2" />
                  API de integración
                </li>
              </ul>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Seleccionar Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
