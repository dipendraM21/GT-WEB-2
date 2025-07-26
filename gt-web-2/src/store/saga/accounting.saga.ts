import { showErrorToast } from '@/components/web/core/Toast/CustomToast'
import {
  GetBookingDetailsDataAction,
  GetMyBookingDetailsDataAction,
} from '@/types/store/action/accounting.action'
import {
  GET_BOOKING_DETAILS_DATA,
  GET_MY_BOOKING_DETAILS_DATA,
} from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getBookingDetailsDataSuccess,
  getMyBookingDetailsDataSuccess,
} from '../actions/accounting.action'
import { getBookingDetailsDataApi, getMyBookingDetailsDataApi } from '../apis'

function* fetchBookingDetailsDataWorker(action: GetBookingDetailsDataAction) {
  try {
    const response: AxiosResponse = yield call(
      getBookingDetailsDataApi,
      action?.payload
    )
    if (response.status === 200) {
      yield put(getBookingDetailsDataSuccess(response?.data?.bookings))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      showErrorToast(error?.response?.data?.message)
    }
  }
}

function* fetchMyBookingDetailsDataWorker(
  action: GetMyBookingDetailsDataAction
) {
  try {
    const response: AxiosResponse = yield call(
      getMyBookingDetailsDataApi,
      action?.payload
    )
    if (response.status === 200) {
      yield put(getMyBookingDetailsDataSuccess(response?.data))
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      showErrorToast(error?.response?.data?.message)
    }
  }
}

export function* accountingSaga() {
  yield takeLatest(GET_BOOKING_DETAILS_DATA, fetchBookingDetailsDataWorker)
  yield takeLatest(GET_MY_BOOKING_DETAILS_DATA, fetchMyBookingDetailsDataWorker)
}
