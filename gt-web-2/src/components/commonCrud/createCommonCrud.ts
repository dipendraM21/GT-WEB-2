import {
  CommonCrudAPI,
  CreateCommonCrudConfig,
  ModuleState,
} from "@/types/module/core/commonCrudTypes";
import { commonAjax } from "./commonAjax";
import { registerCommonCrudApi } from "./commonCrudStore";
import { createCommonCrudHandler } from "./CommonHandler";

// Simple state management without external store
class SimpleStore<T> {
  private _state: T;
  private listeners: Set<(state: T) => void> = new Set();

  constructor(initialState: T) {
    this._state = initialState;
  }

  get state(): T {
    return this._state;
  }

  getState(): T {
    return this._state;
  }

  setState(updater: (state: T) => T): void {
    this._state = updater(this._state);
    this.listeners.forEach((listener) => listener(this._state));
  }

  subscribe(listener: (state: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const createCommonCrud = ({
  apiName,
  apiUrl,
  pageTitle,
  ...otherArg
}: CreateCommonCrudConfig): CommonCrudAPI => {
  const { initialState = {}, reducers = {}, crudApi = {} } = otherArg ?? {};

  // For common call api axios
  const moduleAjaxApi = (arg: Record<string, unknown>) => {
    const { moduleMode, selectedRecord } =
      API.moduleState.getState().commonCrud;
    const url = ["EDIT", "DELETE"].includes(moduleMode || "")
      ? `${API.apiUrl}/${selectedRecord?.id}`
      : API.apiUrl;
    const methodTypes: Record<string, "GET" | "POST" | "PATCH" | "DELETE"> = {
      ADD: "POST",
      EDIT: "PATCH",
      DELETE: "DELETE",
    };
    return commonAjax({
      url,
      type: methodTypes[moduleMode || ""] ?? "GET",
      ...arg,
    });
  };

  // Main api reference store all handler and crud data and state
  const API: CommonCrudAPI = {
    apiName,
    pageTitle,
    apiUrl,
    AjaxApi: moduleAjaxApi,
    crudApi: {
      formCrud: {
        action_alias: "record",
        ...(crudApi.formCrud ?? {}),
      },
      tableCrud: {
        action_alias: "data",
        ...(crudApi.tableCrud ?? {}),
      },
      crudHandler: {
        ...createCommonCrudHandler({ apiName }),
        ...(crudApi.crudHandler ?? {}),
      },
      queryKeys: {
        // Get active keys for invalid query using key
        submitHandlerKey: [
          apiName,
          "{action}",
          "{selectedRecord}",
          "{mutationKey}",
        ],
        dataHandlerKey: [apiName, "{action}", "{queryKey}", "{data}"],
        selectedRecordHandlerKey: [apiName, "{action}", "{queryKey}"],
        deleteRecordHandlerKey: [apiName, "{action}", "{mutationKey}"],
      },
    },
    moduleRef: {
      tableRef: undefined,
      filterFormRef: undefined,
    },
    moduleState: new SimpleStore<ModuleState>({
      apiName,
      commonCrud: {
        formVisibility: false /* for modal form show hide */,
        moduleMode: undefined /* ADD | EDIT | DELETE */,
        selectedRecord:
          undefined /* moduleMode edit and delete time get selected record */,
      },
      filterShow: true,
      ...initialState,
    }),
    reducers: {
      showForm: (state: ModuleState) => {
        state.commonCrud = { formVisibility: true, moduleMode: "ADD" };
      },
      hideForm: (state: ModuleState) => {
        state.commonCrud = { formVisibility: false };
      },
      editRecord: (state: ModuleState, payload: Record<string, unknown>) => {
        state.commonCrud = {
          formVisibility: true,
          moduleMode: "EDIT",
          selectedRecord: payload,
        };
      },
      deleteRecord: (state: ModuleState, payload: Record<string, unknown>) => {
        state.commonCrud = {
          formVisibility: false,
          moduleMode: "DELETE",
          selectedRecord: payload,
        };
      },
      resetCrud: (state: ModuleState) => {
        state.commonCrud = { formVisibility: false };
      },
      toggleFilter: (state: ModuleState) => {
        state.filterShow = !state.filterShow;
      },
      ...reducers,
    },
    actions: {},
  };

  // Create actions for all reducers
  Object.entries(API.reducers).forEach(([key, fn]) => {
    API.actions[key] = (payload?: unknown) => {
      // Set state module state
      API.moduleState.setState((oldState: ModuleState) => {
        const newState = { ...oldState };

        // Modified state for new render
        fn(newState, payload);

        return newState;
      });
    };
  });

  // Register the API in the global store
  registerCommonCrudApi(apiName, API);

  return API;
};

/**
 * Module modes for CRUD operations
 * @typedef {'ADD' | 'EDIT' | 'DELETE'} ModuleMode
 */

/**
 * @typedef {Object} CommonCrudState
 * @property {boolean} formVisibility - Controls form modal visibility
 * @property {ModuleMode} [moduleMode] - Current operation mode
 * @property {*} [selectedRecord] - Currently selected record for edit/delete operations
 */
