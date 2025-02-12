import { supabase } from "./supabase";
import { HygieneRequirement } from "./types";

export const getRequirements = async () => {
  const { data, error } = await supabase
    .from("hygiene_requirements")
    .select("*")
    .order("id");

  if (error) throw error;
  return data as HygieneRequirement[];
};

export const updateRequirement = async (id: string, isCompliant: boolean) => {
  const { error } = await supabase
    .from("hygiene_requirements")
    .update({ is_compliant: isCompliant })
    .eq("id", id);

  if (error) throw error;
};

export const uploadPhoto = async (file: File, requirementId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${requirementId}-${Math.random()}.${fileExt}`;
  const filePath = `hygiene-photos/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("photos").getPublicUrl(filePath);

  await supabase
    .from("hygiene_requirements")
    .update({ photo_evidence: publicUrl })
    .eq("id", requirementId);

  return publicUrl;
};

export const generatePDF = async (requirements: HygieneRequirement[]) => {
  const { data, error } = await supabase.functions.invoke("generate-pdf", {
    body: { requirements },
  });

  if (error) throw error;
  return data.url;
};
