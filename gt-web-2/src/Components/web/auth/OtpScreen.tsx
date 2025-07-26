import { translation } from '@/utils/translation'
import { FC, Fragment } from 'react'
import { Text } from 'theme-ui'
import { OtpInputBox } from '../../../shared/TextInputField/OtpTextInputField'
import ResendOtp from './ResendOtp'

interface OtpScreenProps {
  countdown: number
  handleResendOtp: () => void
  isResendOtp: boolean
  handleChangeOtp: (otp: string) => void
  value: string
}
export const OtpScreen: FC<OtpScreenProps> = ({
  handleChangeOtp,
  handleResendOtp,
  value,
  isResendOtp,
  countdown,
}) => {
  return (
    <Fragment>
      <Text variant="Maison36SemiBold125" className="pb-6">
        {translation?.VERIFY_MOBILE_NUMBER}
      </Text>

      <OtpInputBox onChange={handleChangeOtp} value={value} />

      <div className="pb-7 pt-6">
        <ResendOtp
          isResendOtp={isResendOtp}
          handleResendOtp={handleResendOtp}
          countdown={countdown}
        />
      </div>
    </Fragment>
  )
}
