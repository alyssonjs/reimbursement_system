export interface ProjectTag {
  id: number;
  tag: string;
  allocated_budget?: number;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  budget?: number;
  project_tags?: ProjectTag[];
}

export interface ProjectInput {
  name: string;
  description: string;
  budget: number;
  project_tags: ProjectTag[];
  subordinate_ids: number[];
}

export interface Expense {
  id: number;
  amount: number;
  date: string;
  project_tag: ProjectTag;
  project_tag_id?: string;
  project_id?: string;
  project: Project;
  status: 'pending' | 'accepted' | 'rejected';
  comment?: string;
  description?:string;
  receipt?: File;
  receipt_url?: string;
  fiscal_coupon?: File
  fiscal_coupon_url?: string
  user: { id: number, name: string, email: string }
}

export interface ExpenseInput {
  amount: number;
  date: string;
  project_tag_id: string;
  project: string;
}

export interface ExpenseUpdate {
  status: 'success' | 'rejected';
  comment: string;
}
