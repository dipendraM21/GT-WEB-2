import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AjaxConfig {
  url: string;
  type: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  data?: Record<string, unknown>;
  callback?: () => void;
  rejectCallback?: (error: Error) => void;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface AjaxResponse<T = Record<string, unknown>> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export const commonAjax = async <T = Record<string, unknown>>({
  url,
  type,
  data,
  callback,
  rejectCallback,
  headers = {},
  timeout = 30000,
}: AjaxConfig): Promise<AjaxResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method: type,
      url,
      data: type !== "GET" ? data : undefined,
      params: type === "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout,
    };

    const response: AxiosResponse<AjaxResponse<T>> = await axios(config);

    if (callback) {
      callback();
    }

    return response.data;
  } catch (error: unknown) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    if (rejectCallback) {
      rejectCallback(errorObj);
    }

    throw errorObj;
  }
};

// Helper function to create API endpoints
export const createApiEndpoint = (
  baseUrl: string,
  endpoint: string
): string => {
  return `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
};

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) {
      return response.data.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};
