// Form CRUD actions
export const formCrudActions = (apiName: string) => {
  return {
    create: `${apiName}_CREATE`,
    update: `${apiName}_UPDATE`,
    fetch: `${apiName}_FETCH`,
    delete: `${apiName}_DELETE`,
  };
};

// Table CRUD actions
export const tableCrudActions = (apiName: string) => {
  return {
    get: `${apiName}_GET`,
    filter: `${apiName}_FILTER`,
    sort: `${apiName}_SORT`,
    paginate: `${apiName}_PAGINATE`,
  };
};

// Action types
export type FormActionType = "create" | "update" | "fetch" | "delete";
export type TableActionType = "get" | "filter" | "sort" | "paginate";

// Action creators with proper typing
export const createFormAction = (apiName: string, action: FormActionType) => {
  return `${apiName}_${action.toUpperCase()}`;
};

export const createTableAction = (apiName: string, action: TableActionType) => {
  return `${apiName}_${action.toUpperCase()}`;
};

// Action payload types
export interface FormActionPayload {
  action: string;
  data?: Record<string, unknown>;
  id?: string | number;
  [key: string]: unknown;
}

export interface TableActionPayload {
  action: string;
  page?: number;
  limit?: number;
  filters?: Record<string, unknown>;
  sort?: Record<string, "asc" | "desc">;
  [key: string]: unknown;
}

// Action creators with payload
export const createFormActionWithPayload = (
  apiName: string,
  action: FormActionType,
  payload: Omit<FormActionPayload, "action">
): FormActionPayload => {
  return {
    action: createFormAction(apiName, action),
    ...payload,
  };
};

export const createTableActionWithPayload = (
  apiName: string,
  action: TableActionType,
  payload: Omit<TableActionPayload, "action">
): TableActionPayload => {
  return {
    action: createTableAction(apiName, action),
    ...payload,
  };
};
