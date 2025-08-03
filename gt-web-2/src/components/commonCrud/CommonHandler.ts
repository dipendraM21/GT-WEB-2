import { queryClient } from "@/providers/QueryProvider";
import { CommonCrudHandlers } from "@/types/module/core/commonCrudTypes";
import {
  keepPreviousData,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
// Remove the useStore import since we're using a custom store
import { formCrudActions, tableCrudActions } from "./commonCrudActions";
import { getCommonCrudApiSafe } from "./commonCrudStore";

// Helper function to get search parameters
const getSearchParams = () => {
  // Check if we're in browser environment
  if (typeof window === "undefined") {
    return {
      page: 1,
      limit: 10,
      filters: {},
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  return {
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "10"),
    filters: JSON.parse(searchParams.get("filters") || "{}"),
  };
};

// Helper function to set search parameters
const setSearchParams = (params: Record<string, unknown>) => {
  // Check if we're in browser environment
  if (typeof window === "undefined") {
    return;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  window.history.replaceState(null, "", `?${searchParams.toString()}`);
};

// Submit form handler
const useSubmitHandler = ({
  apiName,
  mutationKey = [],
}: {
  apiName: string;
  mutationKey?: unknown[];
}): UseMutationResult<any, any, any> => {
  const API = getCommonCrudApiSafe(apiName);
  const { moduleMode, selectedRecord = {} } =
    API.moduleState.getState().commonCrud;
  const action =
    formCrudActions(apiName)[moduleMode === "EDIT" ? "update" : "create"];

  const queryKey = [apiName, action, selectedRecord, ...mutationKey];
  API.crudApi.queryKeys.submitHandlerKey = queryKey;

  const submitHandle = ({
    data: formData,
    control,
  }: {
    data: Record<string, unknown>;
    control: any;
  }) => {
    const data = { action, ...selectedRecord, ...formData };

    const rejectCallback = (error: Error) => {
      // Handle form validation errors
      if (control && typeof control.setError === "function") {
        // You can implement your own error handling logic here
        console.error("Form submission error:", error);
      }
    };

    const callback = () => {
      API.actions.hideForm();
      queryClient.invalidateQueries({ queryKey: [apiName] });
    };

    return API.AjaxApi({ data, callback, rejectCallback });
  };

  return useMutation({
    mutationKey: queryKey,
    mutationFn: submitHandle,
  });
};

// Filter submit handler
const useFilterSubmitHandler = ({
  apiName,
  mutationKey = [],
}: {
  apiName: string;
  mutationKey?: unknown[];
}): UseMutationResult<any, any, any> => {
  const API = getCommonCrudApiSafe(apiName);
  const queryKey = [apiName, "filter", ...mutationKey];

  return useMutation({
    mutationKey: queryKey,
    mutationFn: (filterData: Record<string, unknown>) => {
      const searchParamsObject = getSearchParams();

      // Overwrite filter and page = 1
      searchParamsObject.page = 1;
      searchParamsObject.filters = filterData;

      setSearchParams(searchParamsObject);

      // Invalidate query for new data fetch
      queryClient.invalidateQueries({
        queryKey: API.crudApi.queryKeys.dataHandlerKey,
      });
    },
  });
};

// Data handler
const useDataHandler = ({
  apiName,
  queryKey: userQueryKey = [],
  data = {},
}: {
  apiName: string;
  queryKey?: unknown[];
  data?: Record<string, unknown>;
}): UseQueryResult<any, any> => {
  const API = getCommonCrudApiSafe(apiName);
  const action = tableCrudActions(apiName).get;

  const { page = 1, limit = 10, filters = {} } = getSearchParams();
  const queryKey = [
    apiName,
    action,
    page,
    limit,
    filters,
    ...userQueryKey,
    data,
  ];
  API.crudApi.queryKeys.dataHandlerKey = queryKey;

  return useQuery({
    queryKey,
    queryFn: () => {
      const finalData = { action, page, limit, ...filters, ...data };
      return API.AjaxApi({ data: finalData });
    },
    placeholderData: keepPreviousData,
  });
};

// Add record handler
const addRecordHandler = ({ apiName }: { apiName: string }): void => {
  getCommonCrudApiSafe(apiName).actions.showForm();
};

// Edit record handler
const editRecordHandler = ({
  apiName,
  data = {},
}: {
  apiName: string;
  data?: Record<string, unknown>;
}): void => {
  getCommonCrudApiSafe(apiName).actions.editRecord(data);
};

// Selected record handler
const useSelectedRecordHandler = ({
  apiName,
  queryKey: userQueryKey = [],
  ...arg
}: {
  apiName: string;
  queryKey?: unknown[];
  [key: string]: unknown;
}): UseQueryResult<any, any> => {
  const API = getCommonCrudApiSafe(apiName);
  const moduleMode = API.moduleState.getState().commonCrud.moduleMode;
  const selectedRecord =
    API.moduleState.getState().commonCrud.selectedRecord ?? {};
  const action = formCrudActions(apiName).fetch;

  const getRecordDataHandle = () => {
    const data = { action, ...selectedRecord };
    return API.AjaxApi({
      data,
      type: "GET",
      rejectCallback: API.actions.hideForm,
    });
  };

  const queryKey = [apiName, action, selectedRecord, ...userQueryKey];
  API.crudApi.queryKeys.selectedRecordHandlerKey = queryKey;

  return useQuery({
    queryKey,
    queryFn: getRecordDataHandle,
    enabled: moduleMode === "EDIT",
    ...arg,
  });
};

// Delete record handler
const deleteRecordHandler = ({
  apiName,
  data = {},
}: {
  apiName: string;
  data?: Record<string, unknown>;
}): void => {
  getCommonCrudApiSafe(apiName).actions.deleteRecord(data);
};

// Delete record mutation handler
const useDeleteRecordHandler = ({
  apiName,
  mutationKey = [],
}: {
  apiName: string;
  mutationKey?: unknown[];
}): UseMutationResult<any, any, any> => {
  const API = getCommonCrudApiSafe(apiName);
  const action = formCrudActions(apiName).delete;
  const selectedRecord = API.moduleState.state.commonCrud.selectedRecord ?? {};

  const deleteRecordHandler = async (
    deleteData: Record<string, unknown> = {}
  ) => {
    const data = { action, ...selectedRecord, ...deleteData };
    const callback = () => {
      API.actions.resetCrud();
      queryClient.invalidateQueries({ queryKey: [apiName] });
    };
    return API.AjaxApi({ data, callback });
  };

  const queryKey = [apiName, action, selectedRecord, ...mutationKey];
  API.crudApi.queryKeys.deleteRecordHandlerKey = queryKey;

  return useMutation({
    mutationKey: queryKey,
    mutationFn: deleteRecordHandler,
  });
};

// Create Common CRUD Handler
export const createCommonCrudHandler = ({
  apiName,
}: {
  apiName: string;
}): CommonCrudHandlers => {
  return {
    useSubmitHandler: (arg = {}) => useSubmitHandler({ apiName, ...arg }),
    useFilterSubmitHandler: (arg = {}) =>
      useFilterSubmitHandler({ apiName, ...arg }),
    useDataHandler: (arg = {}) => useDataHandler({ apiName, ...arg }),
    addRecordHandler: (arg = {}) => addRecordHandler({ apiName, ...arg }),
    editRecordHandler: (arg = {}) => editRecordHandler({ apiName, ...arg }),
    useSelectedRecordHandler: (arg = {}) =>
      useSelectedRecordHandler({ apiName, ...arg }),
    deleteRecordHandler: (arg = {}) => deleteRecordHandler({ apiName, ...arg }),
    useDeleteRecordHandler: (arg = {}) =>
      useDeleteRecordHandler({ apiName, ...arg }),
  };
};
