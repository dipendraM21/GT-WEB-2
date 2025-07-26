import {
  FlightListingDataProps,
  SearchQueryPayload,
} from '@/types/module/flightSearch'

export interface FlightBookingSagaType {
  type: string
  payload: SearchQueryPayload
  callBack: (res: boolean) => void
}

export interface GetAllFlightListingData {
  type: string
  payload: FlightListingDataProps[]
}

export type FlightBookingActionTypes =
  | FlightBookingSagaType
  | GetAllFlightListingData
