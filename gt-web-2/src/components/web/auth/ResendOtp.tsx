import { CustomText } from "@/components/core/Text";
import { cn } from "@/utils/functions";
import { translation } from "@/utils/translation";
import { Button } from "theme-ui";

type ResendOtpProp = {
  isResendOtp: boolean;
  handleResendOtp: () => void;
  countdown: number;
};
export default function ResendOtp({
  handleResendOtp,
  isResendOtp,
  countdown,
}: ResendOtpProp) {
  return (
    <CustomText variant="font-16-regular-20" color="primary-grey-900">
      {translation?.DIDNT_RECEIVE_CODE}
      <Button
        variant="resendOTPBtn"
        className={cn("underline uppercase  ms-2 me-2", {
          "": isResendOtp,
        })}
        disabled={!isResendOtp}
        onClick={handleResendOtp}
      >
        {translation?.RESEND_NOW}
      </Button>
      00:{countdown < 10 ? `0${countdown}` : countdown}
    </CustomText>
  );
}
