import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  ClipboardCheck,
  Bug,
  Trash2,
  Sparkles,
  CheckSquare,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: ClipboardCheck, label: "Higiene", href: "/hygiene" },
    { icon: Bug, label: "Control de Plagas", href: "/pest-control" },
    { icon: Trash2, label: "Gestión de Residuos", href: "/waste" },
    { icon: Sparkles, label: "Limpieza", href: "/cleaning" },
    { icon: CheckSquare, label: "Autoevaluación", href: "/assessment" },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={
                  location.pathname === route.href ? "secondary" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => navigate(route.href)}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
