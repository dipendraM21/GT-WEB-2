import { FlightBookingSagaType } from '@/types/store/action/flightBooking.action'
import { FLIGHT_SEARCH_REQUEST } from '@/utils/storeTypes'
import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getUsersFailureAction } from '../actions/user.action'
import { setFlightSearchRequestApi } from '../apis'

function* setFlightSearchRequestWorker(action: FlightBookingSagaType) {
  try {
    const response: AxiosResponse = yield call(
      setFlightSearchRequestApi,
      action?.payload
    )
    if (response.status === 200) {
      action.callBack(response.status === 200)
      localStorage.setItem('flightListingData', JSON.stringify(response?.data))
    }
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      yield put(getUsersFailureAction(error))
    }
  }
}

export function* flightBookingApiSaga() {
  yield takeLatest(FLIGHT_SEARCH_REQUEST, setFlightSearchRequestWorker)
}
