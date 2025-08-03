import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
// Simple store interface to avoid external dependencies
export interface SimpleStore<T> {
  getState(): T;
  setState(updater: (state: T) => T): void;
  subscribe(listener: (state: T) => void): () => void;
}

// Module modes for CRUD operations
export type ModuleMode = "ADD" | "EDIT" | "DELETE" | "VIEW";

// Common CRUD state interface
export interface CommonCrudState {
  formVisibility: boolean;
  moduleMode?: ModuleMode;
  selectedRecord?: any;
}

// Module state interface
export interface ModuleState {
  apiName: string;
  commonCrud: CommonCrudState;
  filterShow: boolean;
  [key: string]: any;
}

// API configuration interface
export interface CrudApiConfig {
  formCrud?: {
    action_alias?: string;
    [key: string]: any;
  };
  tableCrud?: {
    action_alias?: string;
    [key: string]: any;
  };
  crudHandler?: {
    [key: string]: any;
  };
  queryKeys?: {
    submitHandlerKey?: any[];
    dataHandlerKey?: any[];
    selectedRecordHandlerKey?: any[];
    deleteRecordHandlerKey?: any[];
  };
}

// Module reference interface
export interface ModuleRef {
  tableRef?: any;
  filterFormRef?: any;
}

// Reducer function type
export type ReducerFunction = (state: any, payload?: any) => void;

// Reducers object type
export interface Reducers {
  [key: string]: ReducerFunction;
}

// Actions object type
export interface Actions {
  [key: string]: (payload?: any) => void;
}

// Main API interface
export interface CommonCrudAPI {
  apiName: string;
  pageTitle: string;
  apiUrl: string;
  AjaxApi: (arg: Record<string, unknown>) => Promise<Record<string, unknown>>;
  crudApi: CrudApiConfig;
  moduleRef: ModuleRef;
  moduleState: SimpleStore<ModuleState>;
  reducers: Reducers;
  actions: Actions;
}

// Create Common CRUD configuration
export interface CreateCommonCrudConfig {
  apiName: string;
  apiUrl: string;
  pageTitle: string;
  initialState?: Partial<ModuleState>;
  reducers?: Reducers;
  crudApi?: Partial<CrudApiConfig>;
}

// Handler functions return types
export interface CommonCrudHandlers {
  useSubmitHandler: (arg?: any) => UseMutationResult<any, any, any>;
  useFilterSubmitHandler: (arg?: any) => UseMutationResult<any, any, any>;
  useDataHandler: (arg?: any) => UseQueryResult<any, any>;
  addRecordHandler: (arg?: any) => void;
  editRecordHandler: (arg?: any) => void;
  useSelectedRecordHandler: (arg?: any) => UseQueryResult<any, any>;
  deleteRecordHandler: (arg?: any) => void;
  useDeleteRecordHandler: (arg?: any) => UseMutationResult<any, any, any>;
}

// Form field types
export interface FormFieldConfig {
  name: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "date"
    | "checkbox"
    | "radio";
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: any;
  options?: Array<{ value: string; label: string }>;
  [key: string]: any;
}

// Table column configuration
export interface TableColumnConfig {
  accessorKey: string;
  header: string;
  cell?: (info: any) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  [key: string]: any;
}

// CRUD form configuration
export interface CrudFormConfig {
  fields: FormFieldConfig[];
  layout?: "vertical" | "horizontal" | "grid";
  submitButtonText?: string;
  cancelButtonText?: string;
  [key: string]: any;
}

// CRUD table configuration
export interface CrudTableConfig {
  columns: TableColumnConfig[];
  pagination?: boolean;
  sorting?: boolean;
  filtering?: boolean;
  rowSelection?: boolean;
  [key: string]: any;
}

// Complete CRUD configuration
export interface CompleteCrudConfig extends CreateCommonCrudConfig {
  form?: CrudFormConfig;
  table?: CrudTableConfig;
}
