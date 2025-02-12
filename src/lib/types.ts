export interface HygieneRequirement {
  id: string;
  requirement: string;
  is_compliant: boolean;
  photo_evidence?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface HygieneState {
  requirements: HygieneRequirement[];
  totalItems: number;
  completedItems: number;
}
