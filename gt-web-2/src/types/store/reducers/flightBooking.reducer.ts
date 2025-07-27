import {
  FlightListingDataProps,
  FlightSearchResultData,
} from '@/types/module/web/flightSearch'

export interface FlightBookingReducerReducerData {
  loading: boolean
  flightFiltersData?: Partial<FlightSearchResultData> | null
  getFlightListingData?: FlightListingDataProps[] | null
  error: Error | null
}
