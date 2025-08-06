import { CustomText } from "@/components/core/Text";
import { TextInputField } from "@/components/core/TextInputField/TextInputField";
import { translation } from "@/utils/translation";

export const ForgotPassword = () => {
  return (
    <div>
      <CustomText variant="font-36-semi-bold-125" className="pb-6">
        {translation?.FORGOT_PASSWORD}
      </CustomText>
      <div className="space-y-4 my-24">
        <TextInputField
          label={translation?.EMAIL}
          placeholder={translation?.ENTER_EMAIL}
          isShowRequired
        />
      </div>
    </div>
  );
};
