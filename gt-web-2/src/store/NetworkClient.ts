/* eslint-disable import/no-anonymous-default-export */

import { ACCESS_TOKEN, COMMON_API_TIMEOUT } from '@/utils/constant'
import { setInitialStorageState } from '@/utils/functions'
import { translation } from '@/utils/translation'
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { ApiError } from 'next/dist/server/api-utils'

interface apiHeaders {
    Accept: string
    [key: string]: string
}

class NetworkClient {
    private service: AxiosInstance
    private cancelTokens: Map<string, any> = new Map()
    private isApi1Pending: boolean = false
    private isRefreshing: boolean = false
    private failedQueue: {
        resolve: (token: string | AxiosResponse) => void
        reject: (error: AxiosError | Error | null) => void
    }[] = []
    constructor() {
        const headers: apiHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        const service: AxiosInstance = axios.create({
            headers,
            withCredentials: true,
            timeout: COMMON_API_TIMEOUT,
            timeoutErrorMessage: translation.REQUEST_TIMEOUT,
        })

        service.interceptors.response.use(this.handleSuccess, this.handleError)

        service.interceptors.request.use(async (config) => {
            const token = Cookies.get(ACCESS_TOKEN)
            if (token) {
                config.headers['Authorization'] = '' + token
            }
            config.baseURL = process.env.NEXT_PUBLIC_API_URL
            return config
        })

        this.service = service
    }

    handleSuccess(response: AxiosResponse) {
        return response
    }

    processQueue(error: Error | AxiosError | null, token: string | null = null) {
        this.failedQueue.forEach((prom) => {
            if (token) {
                prom.resolve(token)
            } else {
                prom.reject(error)
            }
        })
        this.failedQueue = []
    }


    handleError = async (
        error: AxiosError
    ): Promise<AxiosResponse | ApiError> => {
        const originalRequest = error.config

        if (error.response && error.response.status === 401) {
            if (
                `${process.env.NEXT_PUBLIC_API_URL}${translation.STORE_AUTHORIZATION}` ===
                error.request.responseURL
            ) {
                setInitialStorageState()
                return Promise.reject(error)
            }
            if (!this.isRefreshing) {
                this.isRefreshing = true
                const oldAccessToken = Cookies.get(ACCESS_TOKEN)

                if (oldAccessToken) {
                    // Return a promise to handle token refresh
                    return new Promise((resolve, reject) => {
                        this.refreshAccessToken(oldAccessToken)
                            .then((tokenResponse) => {
                                const newAccessToken = tokenResponse?.data?.accessToken

                                if (newAccessToken) {
                                    // Store new token and retry failed requests
                                    Cookies.set(ACCESS_TOKEN, newAccessToken)
                                    this.processQueue(null, newAccessToken)
                                    if (originalRequest) {
                                        originalRequest.headers['Authorization'] =
                                            `${newAccessToken}`
                                        resolve(this.service(originalRequest))
                                    } else {
                                        reject(new Error(translation.ORIGINAL_REQUEST_MISSING))
                                    }
                                } else {
                                    reject(new Error(translation.NEW_ACCESS_TOKEN_MISSING))
                                }
                            })
                            .catch((refreshError) => {
                                this.processQueue(refreshError, null)
                                setInitialStorageState()
                                reject(refreshError)
                            })
                            .finally(() => {
                                this.isRefreshing = false
                            })
                    })
                } else {
                    setInitialStorageState()
                    return Promise.reject(
                        new Error(translation.NO_ACCESS_TOKEN_AVAILABLE)
                    )
                }
            } else {
                return new Promise((resolve, reject) => {
                    this.failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        if (originalRequest) {
                            originalRequest.headers['Authorization'] = '' + token
                            return this.service(originalRequest)
                        } else {
                            return Promise.reject(
                                new Error(translation.ORIGINAL_REQUEST_IS_MISSING)
                            )
                        }
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }
        }

        return Promise.reject(error)
    }

    async refreshAccessToken(
        accessToken: string,
        timeout?: number,
        timeoutErrorMessage?: string
    ): Promise<AxiosResponse> {
        return axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
                { accessToken },
                {
                    withCredentials: true,
                    timeout: timeout || COMMON_API_TIMEOUT,
                    timeoutErrorMessage:
                        timeoutErrorMessage || translation.REQUEST_TIMEOUT,
                }
            )
            .then((response) => response)
    }
    async get(
        path: string,
        headers?: apiHeaders,
        timeout?: number,
        timeoutErrorMessage?: string
    ) {
        return this.service
            .get(path, {
                headers,
                timeout: timeout || this.service.defaults.timeout,
                timeoutErrorMessage:
                    timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
            })
            .then((response: AxiosResponse) => response)
    }

    async patch<T>(
        path: string,
        payload: T,
        headers?: apiHeaders,
        timeout?: number,
        timeoutErrorMessage?: string
    ) {
        return this.service
            .request({
                method: 'PATCH',
                url: path,
                responseType: 'json',
                data: payload,
                headers: headers,
                timeout: timeout || this.service.defaults.timeout,
                timeoutErrorMessage:
                    timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
            })
            .then((response: AxiosResponse) => response)
    }

    async post<T>(
        path: string,
        payload: T,
        headers?: apiHeaders,
        timeout?: number,
        timeoutErrorMessage?: string
    ) {
        return this.service
            .request({
                method: 'POST',
                url: path,
                responseType: 'json',
                data: payload,
                headers: headers,
                timeout: timeout || this.service.defaults.timeout,
                timeoutErrorMessage:
                    timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
            })
            .then((response: AxiosResponse) => {
                return response
            })
    }

    async delete<T>(
        path: string,
        payload: T,
        headers?: apiHeaders,
        timeout?: number,
        timeoutErrorMessage?: string
    ) {
        return this.service
            .request({
                method: 'DELETE',
                url: path,
                responseType: 'json',
                data: payload,
                headers: headers,
                timeout: timeout || this.service.defaults.timeout,
                timeoutErrorMessage:
                    timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
            })
            .then((response: AxiosResponse) => response)
    }

    async put<T>(
        path: string,
        payload: T,
        headers?: apiHeaders,
        timeout?: number,
        timeoutErrorMessage?: string
    ) {
        return this.service
            .request({
                method: 'PUT',
                url: path,
                responseType: 'json',
                data: payload,
                headers: headers,
                timeout: timeout || this.service.defaults.timeout,
                timeoutErrorMessage:
                    timeoutErrorMessage || this.service.defaults.timeoutErrorMessage,
            })
            .then((response: AxiosResponse) => response)
    }
}

export default new NetworkClient()
