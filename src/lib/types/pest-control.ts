export type PestType = "insecto" | "roedor" | "ave" | "otro";

export interface InspectionArea {
  id: string;
  name: string;
  description?: string;
  risk_level: number;
  created_at: string;
  updated_at: string;
}

export interface PestControlProvider {
  id: string;
  name: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  certification_number?: string;
  certification_expiry?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PestInspection {
  id: string;
  area_id: string;
  inspector_id: string;
  inspection_date: string;
  pest_type: PestType;
  evidence_found: boolean;
  evidence_description?: string;
  photo_evidence?: string;
  action_taken?: string;
  follow_up_date?: string;
  status: "pendiente" | "en_proceso" | "completado";
  created_at: string;
  updated_at: string;
}
