export type WasteRiskLevel = "high" | "low";

export interface WasteType {
  id: string;
  name: string;
  risk_level: WasteRiskLevel;
  description: string;
  disposal_instructions: string;
  created_at: string;
  updated_at: string;
}

export interface WasteRecord {
  id: string;
  waste_type_id: string;
  quantity: number;
  unit: string;
  disposal_date: string;
  requires_sanitation: boolean;
  sanitation_status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
