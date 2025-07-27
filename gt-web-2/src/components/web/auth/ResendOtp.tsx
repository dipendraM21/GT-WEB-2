import { cn } from '@/utils/functions'
import { translation } from '@/utils/translation'
import { Button, Text } from 'theme-ui'

type ResendOtpProp = {
  isResendOtp: boolean
  handleResendOtp: () => void
  countdown: number
}
export default function ResendOtp({
  handleResendOtp,
  isResendOtp,
  countdown,
}: ResendOtpProp) {
  return (
    <Text variant="Maison16Regular20" color="grey_dark">
      {translation?.DIDNT_RECEIVE_CODE}
      <Button
        variant="resendOTPBtn"
        className={cn('underline uppercase  ms-2 me-2', {
          '': isResendOtp,
        })}
        disabled={!isResendOtp}
        onClick={handleResendOtp}
      >
        {translation?.RESEND_NOW}
      </Button>
      00:{countdown < 10 ? `0${countdown}` : countdown}
    </Text>
  )
}
