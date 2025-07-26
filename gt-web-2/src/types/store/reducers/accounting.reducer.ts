import { BookingDetailsDataProps } from '@/types/module/adminModules/bookingDetailsModule'

export interface AccountingReducerData {
  loading: boolean
  bookingDetailsData?: BookingDetailsData[] | null
  myBookingDetailsData?: BookingDetailsDataProps | null
  error: Error | null
}
