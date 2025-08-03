import { ModuleMode } from "@/types/module/core/commonCrudTypes";
import React from "react";
import { getCommonCrudApiSafe } from "../commonCrudStore";

interface CommonFormElementProps {
  form: React.ComponentType<{
    toggle: () => void;
    moduleMode: ModuleMode;
    fetchRecord: Record<string, unknown>;
    isUpdateRecord: boolean;
  }>;
  apiName: string;
}

export const CommonFormElement: React.FC<CommonFormElementProps> = ({
  form: FormElement,
  apiName,
}) => {
  const API = getCommonCrudApiSafe(apiName);
  const moduleMode = API.moduleState.getState().commonCrud.moduleMode;
  const { useSelectedRecordHandler } = API.crudApi.crudHandler;
  const { hideForm } = API.actions;

  const { data, isFetching } = useSelectedRecordHandler();

  // For helper variable
  const isUpdateRecord = moduleMode === "EDIT";

  return (
    <>
      <CommonLoader loading={isFetching} />
      {(moduleMode === "ADD" ||
        (moduleMode === "EDIT" && !isFetching && data)) && (
        <FormElement
          toggle={hideForm}
          moduleMode={moduleMode || "ADD"}
          fetchRecord={isUpdateRecord ? data?.data || {} : {}}
          isUpdateRecord={isUpdateRecord}
        />
      )}
    </>
  );
};

interface CommonLoaderProps {
  loading: boolean;
}

export const CommonLoader: React.FC<CommonLoaderProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
    </>
  );
};

export const DeleteRecordModal: React.FC<{ apiName: string }> = ({
  apiName,
}) => {
  const API = getCommonCrudApiSafe(apiName);
  const moduleMode = API.moduleState.getState().commonCrud.moduleMode;
  const { useDeleteRecordHandler } = API.crudApi.crudHandler;
  const { resetCrud } = API.actions;

  const { isPending, mutate } = useDeleteRecordHandler();

  return (
    <>
      {moduleMode === "DELETE" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">
              Delete {API.pageTitle}
            </h2>
            <p className="font-medium text-gray-600 mb-6">
              Are you sure you want to delete this {API.pageTitle}?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                disabled={isPending}
                onClick={resetCrud}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={() => mutate()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
