import { Balance } from '@/types/module/adminModules/balanceModule'
import { CouponDetails } from '@/types/module/adminModules/couponModule'
import { Markup } from '@/types/module/adminModules/markupModule'
import {
  EditUserDetailsBE,
  ManageUserPermissions,
  PaginationProps,
} from '@/types/module/adminModules/userModule'
import {
  BackendUserRegistration,
  ForgotPasswordPrpops,
  LoginPrpops,
  VerifyOtpPrpops,
} from '@/typessss/module/web/authModule'
import { SearchQueryPayload } from '@/types/module/flightSearch'
import { AxiosResponse } from 'axios'
import NetworkClient from './NetworkClient'

const generateApiUrl = (path: string, params?: Record<string, string>) => {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params)
    return `${url}?${searchParams.toString()}`
  }

  return url.toString()
}

export const registerUserApi = (
  data: BackendUserRegistration
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/register`,
    data
  )
}

export const loginApi = (data: LoginPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/login`,
    data
  )
}

export const verifyOtpApi = (data: VerifyOtpPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/verifyotp`,
    data
  )
}

export const resendOtpApi = (data: VerifyOtpPrpops): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/resendotp`,
    data
  )
}

export const forgotPasswordApi = (
  data: ForgotPasswordPrpops
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/forget-password`,
    data
  )
}

export const logoutUser = (accessToken: string): Promise<AxiosResponse> => {
  return NetworkClient.post(`${process.env.NEXT_PUBLIC_API_URL}users/logout`, {
    accessToken,
  })
}

export const manageUserPermissionApi = (
  data: ManageUserPermissions
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/handle-registration`,
    data
  )
}

export const editUserDetailsApi = (
  data: EditUserDetailsBE
): Promise<AxiosResponse> => {
  return NetworkClient.patch(
    `${process.env.NEXT_PUBLIC_API_URL}users/update-user-information`,
    data
  )
}

export const getUserListApi = (
  userData: PaginationProps
): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(userData?.userId ? { userId: userData?.userId } : {}),
    ...(userData?.queryParameter
      ? { searchQuery: userData?.queryParameter }
      : {}),
    userState: userData?.userStatus || 'all',
    pageNo: userData?.pageNo?.toString() || '1',
  }
  const apiUrl = generateApiUrl(`/api/v1/users/requests`, queryParameters)
  return NetworkClient.get(apiUrl)
}

export const getCurrentUserDataApi = (): Promise<AxiosResponse> => {
  return NetworkClient.get(
    `${process.env.NEXT_PUBLIC_API_URL}users/get-current-loggedin-user`
  )
}

export const setFlightSearchRequestApi = (
  data: SearchQueryPayload
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}flights/search`,
    data
  )
}

export const addCouponDetailsApi = (
  data: CouponDetails
): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/add-coupon`,
    data
  )
}

export const addMarkupDetailsApi = (data: Markup): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_CORE_API_URL}markups/add`,
    data
  )
}

export const getMarkupDetailsDataApi = (): Promise<AxiosResponse> => {
  return NetworkClient.get(`${process.env.NEXT_PUBLIC_CORE_API_URL}markups`)
}

export const getBookingDetailsDataApi = (data: {
  fromDate: string
  toDate: string
  type: string
}): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.fromDate ? { fromDate: data?.fromDate } : {}),
    ...(data?.toDate ? { toDate: data?.toDate } : {}),
    ...(data?.type ? { type: data?.type } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}flights/bookings`,
    queryParameters
  )
  return NetworkClient.get(apiUrl)
}

export const getCouponDetailsDataApi = (data?: {
  page: number
  limit: number
  search: string
  sort: string
}): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.page ? { page: data?.page?.toString() } : {}),
    ...(data?.limit ? { limit: data?.limit?.toString() } : {}),
    ...(data?.search ? { search: data?.search } : {}),
    ...(data?.sort ? { sort: data?.sort } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/get-coupons`,
    queryParameters
  )
  return NetworkClient.get(apiUrl)
}

export const getMyBookingDetailsDataApi = (data: {
  bookingId: string
}): Promise<AxiosResponse> => {
  const queryParameters = {
    ...(data?.bookingId ? { bookingId: data?.bookingId } : {}),
  }
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_API_URL}user/booking-details`,
    queryParameters
  )
  return NetworkClient.post(apiUrl, data)
}

export const addBalanceApi = (data: Balance): Promise<AxiosResponse> => {
  return NetworkClient.post(
    `${process.env.NEXT_PUBLIC_CORE_API_URL}users/balance/add`,
    data
  )
}

export const getBalanceDataApi = (data?: {
  userId: string
}): Promise<AxiosResponse> => {
  const apiUrl = generateApiUrl(
    `${process.env.NEXT_PUBLIC_CORE_API_URL}users/balance`,
    data
  )
  return NetworkClient.get(apiUrl)
}
