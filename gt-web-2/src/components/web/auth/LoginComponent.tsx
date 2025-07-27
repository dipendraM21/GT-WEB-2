'use client'
import flightBook from '@/../public/svg/flight-book-banner.svg'
import {
  forgotPasswordAction,
  requestLogin,
  resendOtpAction,
  verifyOtpAction,
} from '@/store/actions/auth.action'
import { AuthUserScreenType } from '@/types/module/authModule'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { ACCESS_TOKEN, IS_ADMIN_USER } from '@/utils/constant'
import { validateNumericOnly } from '@/utils/regexMatch'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import { loginValidationSchema } from '@/utils/validationSchemas'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text } from 'theme-ui'
import { ThemeButton } from '../../core/Button/Button'
import { LoginInputField } from './loginInputField'
import { OtpScreen } from './OtpScreen'

export const LoginComponent = () => {
  const router = useRouter()
  const authUserData = useSelector((state: MainStoreType) => state.authUserData)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      otp: '',
      emailOrMobile: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {},
  })

  const checkIsDisabled = (): boolean => {
    if (authUserData?.loading) {
      return true
    }
    if (
      values?.userName &&
      values?.password &&
      isAgree &&
      showScreen === AuthUserScreenType?.LOGIN &&
      showScreen === AuthUserScreenType?.LOGIN
    ) {
      return false
    }
    if (
      showScreen === AuthUserScreenType?.OTP &&
      values?.otp.length === 4 &&
      showScreen === AuthUserScreenType?.OTP
    ) {
      return false
    }
    if (
      values?.emailOrMobile &&
      showScreen === AuthUserScreenType?.FORGOT_PASSWORD
    ) {
      return false
    }
    return true
  }

  const { handleBlur, values, errors, touched, setFieldValue } = formik

  const [isAgree, setIsAgree] = useState<boolean>(false)
  const [showScreen, setshowScreen] = useState<AuthUserScreenType>(
    AuthUserScreenType?.LOGIN
  )
  const [countdown, setCountdown] = useState(30)
  const [isResendOtp, setResendOtp] = useState<boolean>(false)
  const [isResponse, setIsResponse] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (showScreen === AuthUserScreenType?.OTP && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setResendOtp(true)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [showScreen, countdown])

  useEffect(() => {
    const isAdmin = Cookies.get(IS_ADMIN_USER)
    const accessToken = Cookies.get(ACCESS_TOKEN)
    if (isAdmin === 'true' && accessToken && isResponse) {
      router.push(appRoutes.dashboard)
    }
  }, [router, isResponse])

  const handleClick = () => {
    if (
      values?.userName &&
      values?.password &&
      showScreen === AuthUserScreenType?.LOGIN
    ) {
      dispatch(
        requestLogin(
          { password: values?.password, userName: values?.userName },
          (res) => {
            if (res) {
              setshowScreen(AuthUserScreenType?.OTP)
            }
          }
        )
      )
    }
    if (showScreen === AuthUserScreenType?.OTP && values?.otp.length === 4) {
      dispatch(
        verifyOtpAction(
          { email: values?.userName, otp: values?.otp },
          (res) => {
            setIsResponse(res)
          }
        )
      )
    }

    if (
      showScreen === AuthUserScreenType?.FORGOT_PASSWORD &&
      values?.emailOrMobile
    ) {
      dispatch(
        forgotPasswordAction({ emailOrMobile: values.emailOrMobile }, (res) => {
          if (res) {
            setshowScreen(AuthUserScreenType?.LOGIN)
          }
        })
      )
    }
  }
  const handleChangeOtp = (value: string) => {
    const numericValue = value.replace(validateNumericOnly, '')
    if (numericValue.length <= 4) {
      setFieldValue('otp', numericValue)
    }
  }
  const handleResendOtp = () => {
    dispatch(
      resendOtpAction({ email: values?.userName }, (res) => {
        if (res) {
          setCountdown(30)
          setResendOtp(false)
        }
      })
    )
  }

  const getText = (): string => {
    switch (showScreen) {
      case AuthUserScreenType?.FORGOT_PASSWORD:
        return translation?.VERIFY_RESET
      case AuthUserScreenType?.LOGIN:
        return translation?.LOGIN || ''
      case AuthUserScreenType?.OTP:
        return translation?.VERIFY_OTP || ''
      default:
        return ''
    }
  }

  return (
    <Box
      as="div"
      className=" min-h-screen bg-[#f2f2f2] flex items-center justify-center p-10 "
    >
      <Box
        as="div"
        className="my-[40px] grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <Box
          as="div"
          className="md:block bg-gray-100 flex items-center justify-center border-r border-gray-300"
        >
          <Image src={flightBook} alt="flightBook" priority id="flightBook" />
        </Box>

        <Box
          as="div"
          className={`p-20 sm:p-[50px] position-relative ${showScreen === AuthUserScreenType.OTP || AuthUserScreenType.FORGOT_PASSWORD ? 'flex flex-col justify-center' : ''}`}
        >
          {showScreen === AuthUserScreenType?.LOGIN ||
          showScreen === AuthUserScreenType?.FORGOT_PASSWORD ? (
            <LoginInputField
              errors={errors}
              handleBlur={handleBlur}
              isAgree={isAgree}
              isForgotPassword={
                showScreen === AuthUserScreenType?.FORGOT_PASSWORD
              }
              onChange={(value) => {
                setIsAgree(value)
              }}
              setFieldValue={setFieldValue}
              touched={touched}
              values={values}
              onClickForgotPassword={() => {
                setshowScreen(AuthUserScreenType?.FORGOT_PASSWORD)
                formik.resetForm()
              }}
              key="login-field"
            />
          ) : showScreen === AuthUserScreenType.OTP ? (
            <OtpScreen
              countdown={countdown}
              handleResendOtp={handleResendOtp}
              isResendOtp={isResendOtp}
              handleChangeOtp={handleChangeOtp}
              value={values?.otp}
            />
          ) : null}

          <ThemeButton
            text={getText()}
            disabled={checkIsDisabled()}
            isLoading={authUserData.loading}
            onClick={handleClick}
            sx={{ width: '100%', py: [2, 2, 2, 2, 2, 2, 3] }}
          />
          {showScreen === AuthUserScreenType.LOGIN && (
            <Box as="div" className="text-center pt-[14px]">
              <Text variant="Maison16Regular20">
                {translation?.NO_HAVE_ACCOUNT}{' '}
                <Link
                  href={appRoutes?.userRegistration}
                  className="link-primary whitespace-nowrap"
                >
                  {translation?.CREATE_AN_ACCOUNT}
                </Link>
              </Text>
            </Box>
          )}

          {showScreen === AuthUserScreenType.FORGOT_PASSWORD && (
            <Box as="div" className="text-center pt-6">
              <Text variant="Maison16Regular20">
                {translation?.ALREADY_HAVE_ACCOUNT}{' '}
                <Link
                  href=""
                  onClick={() => {
                    setshowScreen(AuthUserScreenType?.LOGIN)
                  }}
                  className="link-primary whitespace-nowrap"
                >
                  {translation?.LOGIN}
                </Link>
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
