import * as yup from 'yup'
import { gstRegex, panRegex } from './regexMatch'
import { translation, translationWithFunction } from './translation'

export const signupValidationSchema = yup.object().shape({
  title: yup.string().required(translation.TITLE_IS_REQUIRED),
  firstName: yup.string().required(translation.FIRST_NAME_IS_REQUIRED),
  lastName: yup.string().required(translation.LAST_NAME_IS_REQUIRED),
  email: yup
    .string()
    .email(translation.INVALID_EMAIL_FORMAT)
    .required(translation.EMAIL_IS_REQUIRED),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, translation.INVALID_MOBILE_NUMBER)
    .required(translation.MOBILE_NUMBER_IS_REQUIRED),
  userName: yup.string().required(translation.USERNAME_IS_REQUIRED),
  companyName: yup.string().required(translation.COMPANY_NAME_IS_REQUIRED),
  registerAs: yup.string().required(translation.REGISTER_AS_IS_REQUIRED),
  panNumber: yup
    .string()
    .matches(
      panRegex,
      'Invalid PAN format. It should be in the format AAAAA1234A.'
    )
    .required('PAN number is required'),
  gstNumber: yup.string().matches(gstRegex, 'Invalid GST number format.'),
  nameOnPan: yup.string().required(translation.NAME_ON_PAN_IS_REQUIRED),
  landline: yup.string().required(translation.LANDLINE_IS_REQUIRED),
  addressLine1: yup.string().required(translation.ADDRESS_LINE1_IS_REQUIRED),
  city: yup.string().required(translation.CITY_IS_REQUIRED),
  state: yup.string().required(translation.STATE_IS_REQUIRED),
  pinCode: yup.string().required(translation.PIN_CODE_IS_REQUIRED),
  country: yup.string().required(translation.COUNTRY_IS_REQUIRED),
})

export const addCouponValidationSchema = yup?.object()?.shape({
  seriesName: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Series Name')),
  origin: yup
    ?.string()
    .required(translationWithFunction?.requiredValidation('Origin')),
  destination: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Destination')),
  journeyType: yup
    ?.string()
    .required(translationWithFunction?.requiredValidation('Journey Type')),
  carrier: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Carrier')),
  flightNumber: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Flight Number')),
  flightClass: yup
    ?.string()
    ?.required(
      translationWithFunction?.requiredValidation('Flight Class Type')
    ),
  depTime: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Dep. Time')),
  arrTime: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Arr. Time')),
  totalDuration: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Total Duration')),
  availableSeats: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('Available Seats')),
  startJourneyDate: yup
    ?.string()
    ?.required(
      translationWithFunction?.requiredValidation('Start Journey Date')
    ),
  endJourneyDate: yup
    ?.string()
    ?.required(translationWithFunction?.requiredValidation('End Journey Date')),
  adultTax: yup
    ?.number()
    ?.typeError('Adult Tax must be a number')
    ?.positive('Adult Tax must be greater than 0')
    ?.required(translationWithFunction?.requiredValidation('Adult Tax')),
  childTax: yup
    ?.number()
    ?.typeError('Child Tax must be a number')
    ?.positive('Child Tax must be greater than 0')
    ?.required(translationWithFunction?.requiredValidation('Child Tax')),
  infantTax: yup
    ?.number()
    ?.typeError('Infant Tax must be a number')
    ?.positive('Infant Tax must be greater than 0')
    ?.required(translationWithFunction?.requiredValidation('Infant Tax')),
  totalAmount: yup
    ?.number()
    ?.typeError('Total Amount must be a number')
    ?.positive('Total Amount must be greater than 0')
    ?.required(translationWithFunction?.requiredValidation('Total Amount')),
  couponSectors: yup.array().of(
    yup.object().shape({
      carrier: yup
        .string()
        .required(translationWithFunction?.requiredValidation('Carrier')),
      flightNumber: yup
        .string()
        .required(translationWithFunction?.requiredValidation('Flight Number')),
      classType: yup
        .string()
        .required(translationWithFunction?.requiredValidation('Class Type')),
      flightType: yup
        .string()
        .required(translationWithFunction?.requiredValidation('Flight Type')),
    })
  ),
})

export const loginValidationSchema = yup.object().shape({
  userName: yup.string().required(translation.REQUIRED),
  password: yup.string().required(translation.REQUIRED),
})
