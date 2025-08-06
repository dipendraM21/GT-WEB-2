import { CustomText } from "@/components/core/Text";
import { TextInputField } from "@/components/core/TextInputField/TextInputField";
import { translation } from "@/utils/translation";
import { FormikErrors, FormikTouched } from "formik";
import { FC } from "react";
import { Box } from "theme-ui";
import { TermsCheckbox } from "../../core/CheckBox/TermsCheckbox";

interface LoginInputSchema {
  userName: string;
  password: string;
  otp: string;
  emailOrMobile: string;
}

interface LoginInputField {
  values: LoginInputSchema;
  isForgotPassword: boolean;
  isAgree: boolean;
  onChange: (value: boolean) => void;
  onClickForgotPassword: () => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<LoginInputSchema>>;
  errors: FormikErrors<LoginInputSchema>;
  touched: FormikTouched<LoginInputSchema>;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}
export const LoginInputField: FC<LoginInputField> = ({
  isForgotPassword,
  values,
  setFieldValue,
  onChange,
  errors,
  touched,
  handleBlur,
  isAgree,
  onClickForgotPassword,
}) => {
  const getText = () => {
    if (isForgotPassword) {
      return translation?.FORGOT_PASSWORD;
    } else {
      return translation?.USER_LOGIN;
    }
  };

  const getValues = () => {
    if (isForgotPassword) {
      return values?.emailOrMobile;
    } else {
      return values?.userName;
    }
  };
  return (
    <Box as="div" className={isForgotPassword ? "pb-7" : ""}>
      <CustomText variant="font-36-semi-bold-125" className="mb-7">
        {getText()}
      </CustomText>
      <CustomText
        as="p"
        className="mb-4"
        variant="font-16-medium-20"
        color="primary-grey-600"
      >
        {isForgotPassword
          ? translation?.ENTER_EMAIL_OR_PHONE_TO_PROCEED
          : translation?.LOGIN_WITH_YOUR_CREDENTIALS}
      </CustomText>
      <TextInputField
        id="username-input"
        label={translation?.EMAIL_OR_PHONE}
        placeholder={translation?.ENTER_EMAIL_OR_PHONE}
        wrapperClass="mb-4px"
        isShowRequired
        name={isForgotPassword ? "emailOrMobile" : "userName"}
        value={getValues()}
        firstInputBox
        onChange={(value) => {
          if (!isForgotPassword) {
            setFieldValue("userName", value);
          } else {
            setFieldValue("emailOrMobile", value);
          }
        }}
        errors={!isForgotPassword && errors?.userName}
        touched={!isForgotPassword && touched?.userName}
        onBlur={handleBlur}
      />
      {!isForgotPassword && (
        <>
          <TextInputField
            id="password-input"
            label={translation?.PASSWORD}
            placeholder={translation?.ENTER_PASSWORD}
            isEyeShow
            type="password"
            name="password"
            isShowRequired
            iconWrapperClassName="cursor-pointer"
            value={values?.password}
            onChange={(value) => {
              setFieldValue("password", value);
            }}
            errors={errors?.password}
            touched={touched?.password}
            onBlur={handleBlur}
          />

          <CustomText
            variant="font-16-medium-20"
            as="p"
            color="primary-blue-700"
            className="text-right my-2 whitespace-nowrap cursor-pointer flex justify-end"
            onClick={onClickForgotPassword}
          >
            {translation?.FORGOT_PASSWORD}
          </CustomText>

          <TermsCheckbox
            text={translation?.AGREEMENT_NOTICE}
            privacyLabel={translation?.PRICACY_POLICY}
            termsLabel={translation?.TERMS_OF_SERVICES}
            textClass="flex flex-wrap ms-2 whitespace-nowrap"
            wrapperClass="flex items-start mb-2"
            onChange={onChange}
            checked={isAgree}
          />
        </>
      )}
    </Box>
  );
};
