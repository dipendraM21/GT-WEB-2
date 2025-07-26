import { combineReducers } from 'redux'
import { accountingReducer } from './accounting.reducer'
import { authReducer } from './auth.reducer'
import { balanceReducer } from './balance.reducer'
import { couponReducer } from './coupon.reducer'
import { flightBookingReducer } from './flightBooking.reducer'
import { userReducer } from './user.reducer'

const rootReducer = combineReducers({
  authUserData: authReducer,
  userData: userReducer,
  flightBookingData: flightBookingReducer,
  couponData: couponReducer,
  accountingData: accountingReducer,
  balanceData: balanceReducer,
})

export default rootReducer
