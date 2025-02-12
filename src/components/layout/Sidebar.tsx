import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileCheck,
  ClipboardCheck,
  Factory,
  Bug,
  Truck,
  Home,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ClipboardCheck, label: "Buenas Prácticas", href: "/hygiene" },
  {
    icon: FileCheck,
    label: "Documentos",
    href: "/documents/setup",
    variant: "ghost" as const,
  },
  {
    icon: Factory,
    label: "Instalaciones",
    href: "/facilities",
    disabled: true,
  },
  {
    icon: Bug,
    label: "Control de Plagas",
    href: "/pest-control",
    disabled: true,
  },
  {
    icon: Truck,
    label: "Proveedores",
    href: "/suppliers",
    disabled: true,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn("pb-12 border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Módulos
            </h2>
            <ScrollArea className="h-[calc(100vh-12rem)] px-2">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={
                      location.pathname === item.href ? "secondary" : "ghost"
                    }
                    size="lg"
                    className={cn(
                      "w-full justify-start",
                      item.disabled && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => !item.disabled && navigate(item.href)}
                    disabled={item.disabled}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
