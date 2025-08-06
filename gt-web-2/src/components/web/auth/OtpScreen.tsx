import { CustomText } from "@/components/core/Text";
import { OtpInputBox } from "@/components/core/TextInputField/OtpTextInputField";
import { translation } from "@/utils/translation";
import { FC, Fragment } from "react";
import ResendOtp from "./ResendOtp";

interface OtpScreenProps {
  countdown: number;
  handleResendOtp: () => void;
  isResendOtp: boolean;
  handleChangeOtp: (otp: string) => void;
  value: string;
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
      <CustomText variant="font-36-semi-bold-125" className="pb-6">
        {translation?.VERIFY_MOBILE_NUMBER}
      </CustomText>

      <OtpInputBox onChange={handleChangeOtp} value={value} />

      <div className="pb-7 pt-6">
        <ResendOtp
          isResendOtp={isResendOtp}
          handleResendOtp={handleResendOtp}
          countdown={countdown}
        />
      </div>
    </Fragment>
  );
};
