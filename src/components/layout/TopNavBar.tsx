import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { UserMenu } from "./UserMenu";

const TopNavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500"
          onClick={() => navigate("/")}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <img src="/logo.svg" alt="Buenas Prácticas" className="h-8" />
      </div>
      <div className="flex items-center gap-2">
        <UserMenu />
      </div>
    </nav>
  );
};

export default TopNavBar;
