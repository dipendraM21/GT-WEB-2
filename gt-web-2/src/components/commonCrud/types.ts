// Type definitions for better type safety
export interface FormControl {
  setError?: (field: string, error: string) => void;
}

export interface FormSubmissionData {
  data: Record<string, unknown>;
  control: FormControl;
}

export interface ApiResponse<T = Record<string, unknown>> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export interface TableData {
  data: Record<string, unknown>[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface FilterData {
  [key: string]: unknown;
}

export interface SearchParams {
  page: number;
  limit: number;
  filters: FilterData;
}

export interface MutationConfig {
  apiName: string;
  mutationKey?: unknown[];
}

export interface QueryConfig {
  apiName: string;
  queryKey?: unknown[];
  data?: Record<string, unknown>;
}

export interface RecordData {
  [key: string]: unknown;
}
