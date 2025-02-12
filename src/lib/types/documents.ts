export interface DocumentFormat {
  id: string;
  type: DocumentType;
  name: string;
  template: {
    font?: string;
    fontSize?: number;
    margins?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    sections?: string[];
    maxColumns?: number;
    required?: string[];
  };
}

export type DocumentType = "PR" | "IN" | "RG" | "FO" | "MA" | "PL" | "TA";

export type DocumentStatus = "draft" | "in_review" | "approved" | "obsolete";

export interface Document {
  id: string;
  code: string;
  title: string;
  content: any;
  version: string;
  status: DocumentStatus;
  type: DocumentType;
  format_id: string;
  department_id: string;
  created_by: string;
  approved_by?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  next_review_date?: string;
  last_review_date?: string;
  review_cycle?: string;
  format_validation?: any;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version: string;
  content: any;
  changes_summary?: string;
  created_by: string;
  created_at: string;
}
