import {
  FlightListingDataProps,
  FlightSearchResultData,
  SearchQueryPayload,
} from '@/types/module/web/flightSearch'
import {
  FLIGHT_SEARCH_REQUEST,
  GET_ALL_FLIGHT_LISTING_DATA,
  SAVE_FLIGHT_SEARCH_DATA,
} from '@/utils/storeTypes'

export const setFlightSearchRequest = (
  flightSearchData?: SearchQueryPayload,
  callBack?: (res: boolean) => void
) => ({
  type: FLIGHT_SEARCH_REQUEST,
  payload: flightSearchData,
  callBack,
})

export const saveFlightSearchData = (
  data: Partial<FlightSearchResultData>
) => ({
  type: SAVE_FLIGHT_SEARCH_DATA,
  payload: data,
})

export const getAllFlightListingData = (data: FlightListingDataProps[]) => ({
  type: GET_ALL_FLIGHT_LISTING_DATA,
  payload: data,
})
