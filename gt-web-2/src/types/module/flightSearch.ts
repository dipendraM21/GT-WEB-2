type JourneyType = 'oneway' | 'roundtrip' | 'multicity'
export type CabinClass = 'ECONOMY' | 'BUSINESS' | 'FIRST'
type DomIntFlag = 'D' | 'I'

export interface FlightSearchRequest {
  departureDate: string
  returnDate?: string | null
  preferredCabinClass: CabinClass
  domIntFlag: DomIntFlag
  agency: string
}

export interface FlightScheduleInfoProps {
  date: string
  time: string
  airportCode: string
  city: string
  airportName: string
  terminal?: string

  dateVariant?: string
  timeVariant?: string
  airportCodeCityVariant?: string
  airportNameVariant?: string
  terminalVariant?: string

  dateColor?: string
  timeColor?: string
  airportCodeCityColor?: string
  airportNameColor?: string
  terminalColor?: string
}

export interface SearchQueryPayloadItem {
  cabinClass: CabinClass
  paxInfo: {
    ADULT: string
    CHILD: string
    INFANT: string
  }
  routeInfos: RouteInfosProps[]
  searchModifiers?: {
    isDirectFlight: boolean
    isConnectingFlight: boolean
  }
}

export interface SearchQueryPayload {
  searchQuery: SearchQueryPayloadItem
}

export interface RouteInfosProps {
  fromCityOrAirport: {
    code: string
  }
  toCityOrAirport: {
    code: string
  }
  travelDate?: string
}

export interface AirportDataItemsProps {
  iata_code: string
  municipality: string
  iso_country: string
  type: string
}

export interface FlightSearchResultData {
  origin: string
  destination: string
  departureDate: Date
  returnDate?: Date
  cabinClass: CabinClass
  journeyType: string
  passengers: PassengerInfo
}

export interface PassengerInfo {
  adults?: string
  children?: string
  infants?: string
}

export interface FlightSegment {
  flightCode: string
  airlineName: string
  airlineCode: string
  from: string
  fromCity: string
  fromTerminal: string
  to: string
  toCity: string
  toTerminal: string
  departureTime: string
  arrivalTime: string
  duration: number
  stops: number
}

export interface Baggage {
  checkIn: string
  cabin: string
}

export interface Fare {
  fareIdentifier: string
  totalFare: number
  baseFare: number
  taxes: number
  baggage: Baggage
  cabinClass: string
  fareBasis: string
  meal: string
  seatsAvailable: number
  benefit: string | null
  consentMsg: string | null
  refundType: string
  bookingCode: string
  priceID: string
}

export interface FlightListingDataProps {
  segments: FlightSegment[]
  fares: Fare[]
}
