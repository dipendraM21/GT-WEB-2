/* eslint-disable no-unused-vars */

import { axiosApi } from "@services/api"
import { isAxiosError } from "axios";

// const createCommonAjax
export const createCommonAjax = ({ url, config } = {}) => {
    return ({ config: userConfig = {}, ...arg }) => {
        // over write user config for axios option
        const mergedConfig = { ...config, ...userConfig };
        return commonAjax({ url, config: mergedConfig, ...arg })
    }
}


export const commonAjax = async ({ url, type = "GET", data = {}, config = {}, callback, rejectCallback, successKey = 'success', errorKey = 'error' }) => {
    try {
        const method = type.toLowerCase();
        // request method type
        // const requestContentType = data instanceof FormData ? "multipart/form-data" : "application/json";

        // request headers
        // const requestHeaders = { ...(config.headers ?? {}), 'Content-Type': requestContentType }
        const requestHeaders = { ...(config.headers ?? {}) }
        const finalConfig = { ...config, requestHeaders }

        let axiosResponse;
        // call ajax request
        if (method === "get" || method === "delete") axiosResponse = (finalConfig.params = data, await axiosApi[method](url, finalConfig))
        else axiosResponse = await axiosApi[method](url, data, finalConfig);

        if (callback) callback(axiosResponse)

        // success toast show is pending

        return axiosResponse
    } catch (error) {
        const errorData = isAxiosError(error) ? error.response.data : error;

        // error toast show is pending

        if (rejectCallback) rejectCallback(errorData)
        throw new Error(error)
    }
}

