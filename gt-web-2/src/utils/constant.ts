import deals from '@/../public/images/deals.png'
import easyBooking from '@/../public/images/easy-booking.png'
import flight from '@/../public/images/flight-1.png'
import lowestPrice from '@/../public/images/lowest-price.png'
import support from '@/../public/images/support.png'
import earlyMrng from '@/../public/svg/early-mrng.svg'
import midDay from '@/../public/svg/mid-day.svg'
import mrng from '@/../public/svg/mrng.svg'
import night from '@/../public/svg/night.svg'
import { OptionType } from '@/components/shared/RadioButton/RadioButton'
import { CommonFillterData, NavItemsProps } from '@/types/module/core/commonModule'
import { FlightInfoProps } from '@/types/module/core/routesModule'
import { MdFlightTakeoff } from 'react-icons/md'
import { toLocaleLowerCase } from './functions'
import { appRoutes } from './routes'
import { translation } from './translation'

export const TOAST_COMMON_POSITION = 'top-right'
export const TOAST_COMMON_THEME = 'colored'
export const TOAST_CLOSE_ICON_ALT = 'toast-close-icon'
export const TOAST_ERROR_ICON_ALT = 'toast-error-icon'
export const COMMON_TOAST_TIMEOUT = 3000
export const COMMON_API_TIMEOUT = 60000
export const ACCESS_TOKEN = 'accessToken'
export const IS_ADMIN_USER = 'is-admin'
export const ADMIN_ROUTE = '/admin'
export const FALSE = 'false'
export const TRUE = 'true'
export const ARROW_SIZE = 16
export const ITEMS_PER_PAGE = 10

export const UserListFillterData: CommonFillterData[] = [
  {
    key: toLocaleLowerCase(translation?.ALL),
    label: translation?.ALL,
  },
  {
    key: toLocaleLowerCase(translation?.APPROVED),
    label: translation?.APPROVED,
  },
  {
    key: toLocaleLowerCase(translation?.PENDING),
    label: translation?.PENDING,
  },
  {
    key: toLocaleLowerCase(translation?.REJECTED),
    label: translation?.REJECTED,
  },
]

export const navItems: NavItemsProps[] = [
  { name: translation?.HOME, href: appRoutes?.home },
  { name: translation?.ABOUT, href: appRoutes?.about },
  { name: translation?.CONTACT, href: appRoutes?.contact },
  { name: translation?.SUPPORT, href: appRoutes.support },
]

const featureData = [
  {
    icon: easyBooking,
    heading: 'Easy Booking',
    description:
      'We offer easy and convenient flight bookings with attractive offers.',
  },
  {
    icon: lowestPrice,
    heading: 'Lowest Price',
    description:
      'We ensure low rates on hotel reservation, holiday packages and on flight tickets.',
  },
  {
    icon: deals,
    heading: 'Exciting Deals',
    description:
      'Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.',
  },
  {
    icon: support,
    heading: '24/7 Support',
    description:
      'Get assistance 24×7 on any kind of travel related query. We are happy to assist you.',
  },
]

export default featureData

export const selecteTripOptions = [
  { label: translation?.ONE_WAY, value: translation?.ONE_WAY },
  { label: translation?.ROUND_TRIP, value: translation?.ROUND_TRIP },
]

export const selectedAstringirPrice: OptionType<number>[] = [
  { label: 23000, value: 23300 },
  { label: 23080, value: 2460 },
]

export const refundData = [
  { label: translation?.REFUNDABLE, value: translation?.REFUNDABLE },
  { label: translation?.NON_REFUNDABLE, value: translation?.NON_REFUNDABLE },
]

export const flightBookingTabs = [
  {
    key: 'flight',
    label: 'Flight',
    IconComponent: MdFlightTakeoff,
  },
]

export const GuestNumberSelectorData = ['1', '2', '3', '4', '5', '6', '7', '8']

export const travelClassesData = [
  { label: 'Economy', value: 'ECONOMY' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'First', value: 'FIRST' },
]

export const stopsData = [
  { label: 'Non-stop', value: 'non_stop', checked: false },
  { label: '1 Stop', value: 'one_stop', checked: false },
]

// data/flightTimeSlots.ts
export const flightTimeSlots = [
  {
    label: 'Early Morning',
    timeRange: 'Before 6AM',
    icon: earlyMrng,
    value: 'early_morning',
  },
  {
    label: 'Morning',
    timeRange: '6AM - 12PM',
    icon: mrng,
    value: 'morning',
  },
  {
    label: 'Mid Day',
    timeRange: '12PM - 6PM',
    icon: midDay,
    value: 'mid_day',
  },
  {
    label: 'Night',
    timeRange: 'After 6PM',
    icon: night,
    value: 'night',
  },
]

export const airLinesData = [
  {
    label: 'Air India',
    icon: flight,
    value: 'early_morning',
  },
]
export const flightCardData: FlightInfoProps[] = [
  {
    title: 'Indigo',
    airCode: 'AI2421',
    time1: '02:15',
    time2: '04:15',
    dep1: 'DEL',
    dep2: 'BOM',
    price: '₹19,000',
    duration: '2h 00m',
    stopType: 'Non-stop',
    src: flight,
  },
  {
    title: 'Indigo',
    airCode: 'AI2421',
    time1: '02:15',
    time2: '04:15',
    dep1: 'DEL',
    dep2: 'BOM',
    price: '₹19,000',
    duration: '2h 00m',
    stopType: 'Non-stop',
    src: flight,
  },
]

export const sortOptionsList = [
  { label: 'Price', subLabel: 'Low to High', value: 'price' },
  { label: 'Fastest', subLabel: 'Shortest First', value: 'fastest' },
  { label: 'Departure', subLabel: 'Earliest First', value: 'departure' },
  { label: 'Smart', subLabel: 'Recommended', value: 'smart' },
]

export const dummyFlightListingData = [
  {
    segments: [
      {
        flightCode: 'AI101',
        airlineName: 'Air India',
        airlineCode: 'AI',
        from: 'DEL',
        fromCity: 'New Delhi',
        fromTerminal: 'T3',
        to: 'BOM',
        toCity: 'Mumbai',
        toTerminal: 'T2',
        departureTime: '2025-06-19T08:00:00',
        arrivalTime: '2025-06-19T10:10:00',
        duration: 130,
        stops: 0,
      },
      {
        flightCode: '6E203',
        airlineName: 'IndiGo',
        airlineCode: '6E',
        from: 'BOM',
        fromCity: 'Mumbai',
        fromTerminal: 'T1',
        to: 'BLR',
        toCity: 'Bangalore',
        toTerminal: 'T1',
        departureTime: '2025-06-19T12:00:00',
        arrivalTime: '2025-06-19T13:45:00',
        duration: 105,
        stops: 0,
      },
    ],
    fares: [
      {
        fareIdentifier: 'AI101_ECO_SAVER',
        totalFare: 7600,
        baseFare: 6000,
        taxes: 1600,
        baggage: {
          checkIn: '15kg',
          cabin: '7kg',
        },
        cabinClass: 'Economy',
        fareBasis: 'SAVER',
        meal: 'Free Meal',
        seatsAvailable: 5,
        benefit: 'Free date change once',
        consentMsg: 'Non-refundable after check-in',
        refundType: 'Non-Refundable',
        bookingCode: 'Y',
        priceID: 'PRICE12345',
      },
      {
        fareIdentifier: '6E203_ECO_FLEXI',
        totalFare: 6800,
        baseFare: 5400,
        taxes: 1400,
        baggage: {
          checkIn: '20kg',
          cabin: '7kg',
        },
        cabinClass: 'Economy',
        fareBasis: 'FLEXI',
        meal: 'Buy On Board',
        seatsAvailable: 3,
        benefit: null,
        consentMsg: 'Flexible change allowed',
        refundType: 'Partially Refundable',
        bookingCode: 'B',
        priceID: 'PRICE67890',
      },
    ],
  },
]

export const BookingTypeOptions = [
  { label: ' Flight Bookings', value: 'flight_bookings' },
  { label: 'Flight Cancelation', value: 'flight_cancelation' },
]

export const carrierOptions = [
  { value: '6E', label: '6E - IndiGo' },
  { value: 'G8', label: 'G8 - Go First' },
  { value: 'SG', label: 'SG - SpiceJet' },
  { value: 'I5', label: 'I5 - AirAsia India' },
  { value: 'AI', label: 'AI - Air India' },
  { value: 'UK', label: 'UK - Vistara' },
  { value: 'S9', label: 'S9 - Star Air' },
  { value: 'QP', label: 'QP - Akasa Air' },
  { value: '9I', label: '9I - Alliance Air' },
  { value: 'FD', label: 'FD - Thai AirAsia' },
  { value: 'IX', label: 'IX - Air India Express' },
]

export const airLineTerminalOptions = ['T1', 'T2', 'T3']

export const queueStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Rejected', value: 'rejected' },
]

export const myBookingTypeOptions = [
  { label: 'Flight Bookings', value: 'flight_bookings' },
  { label: 'Flight Cancelation', value: 'flight_cancelation' },
  { label: 'Flight Reschedule', value: 'flight_reschedule' },
]
export const selectCategoryOptions = [
  { label: 'Flights Domestic', value: 'Flights Domestic' },
  { label: 'Flights International', value: 'Flights International' },
]

export const airlineTypeOptions = [
  { label: 'Percentage', value: 'Percentage' },
  { label: 'Flat', value: 'Fixed' },
]

export const paymentModeOptions = [
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Debit Card', value: 'Debit Card' },
  { label: 'Amex', value: 'Amex' },
  { label: 'NetBanking', value: 'NetBanking' },
  { label: 'UPI', value: 'UPI' },
]
