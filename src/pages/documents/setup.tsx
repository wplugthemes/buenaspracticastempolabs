import React from "react";
import { useNavigate } from "react-router-dom";
import { SetupQuestionnaire } from "@/components/documents/SetupQuestionnaire";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";

const DocumentSetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    try {
      const { error } = await supabase.from("companies").insert({
        name: data.companyName,
        user_id: user?.id,
        process_code: data.processCode,
        review_year: data.reviewYear,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company setup completed",
      });

      navigate("/documents");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save company information",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Document Management Setup
        </h1>
        <SetupQuestionnaire onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DocumentSetupPage;
