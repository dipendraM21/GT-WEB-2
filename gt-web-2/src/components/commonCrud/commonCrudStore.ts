import { CommonCrudAPI } from "@/types/module/core/commonCrudTypes";

// Global store to hold all CRUD API instances
const commonCrudStore = new Map<string, CommonCrudAPI>();

/**
 * Register a CRUD API instance in the global store
 * @param apiName - Unique identifier for the API
 * @param apiInstance - The CRUD API instance
 */
export const registerCommonCrudApi = (
  apiName: string,
  apiInstance: CommonCrudAPI
): void => {
  commonCrudStore.set(apiName, apiInstance);
};

/**
 * Get a CRUD API instance from the global store
 * @param apiName - Unique identifier for the API
 * @returns The CRUD API instance or undefined if not found
 */
export const getCommonCrudApi = (
  apiName: string
): CommonCrudAPI | undefined => {
  return commonCrudStore.get(apiName);
};

/**
 * Remove a CRUD API instance from the global store
 * @param apiName - Unique identifier for the API
 */
export const removeCommonCrudApi = (apiName: string): void => {
  commonCrudStore.delete(apiName);
};

/**
 * Get all registered CRUD API instances
 * @returns Map of all registered APIs
 */
export const getAllCommonCrudApis = (): Map<string, CommonCrudAPI> => {
  return new Map(commonCrudStore);
};

/**
 * Check if a CRUD API instance exists in the store
 * @param apiName - Unique identifier for the API
 * @returns True if the API exists, false otherwise
 */
export const hasCommonCrudApi = (apiName: string): boolean => {
  return commonCrudStore.has(apiName);
};

/**
 * Get the count of registered CRUD API instances
 * @returns Number of registered APIs
 */
export const getCommonCrudApiCount = (): number => {
  return commonCrudStore.size;
};

/**
 * Clear all CRUD API instances from the store
 */
export const clearCommonCrudStore = (): void => {
  commonCrudStore.clear();
};

// Type-safe wrapper for getting API with error handling
export const getCommonCrudApiSafe = (apiName: string): CommonCrudAPI => {
  const api = getCommonCrudApi(apiName);
  if (!api) {
    throw new Error(
      `CRUD API with name '${apiName}' not found. Make sure it's registered first.`
    );
  }
  return api;
};
