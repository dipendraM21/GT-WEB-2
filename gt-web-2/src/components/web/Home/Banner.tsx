"use client";
import CommonInputCard from "@/components/core/Card/CommonInputCard";
import { Field } from "@/types/module/web/authModule";
import { toCamelCase } from "@/utils/functions";

import { translation } from "@/utils/translation";

const Banner = () => {
  const CompanyDetailsfieldset: Field[] = [
    {
      name: toCamelCase(translation?.EMAIL_OR_PHONE),
      label: translation?.EMAIL_OR_PHONE,
      value: "",
      placeholder: translation?.ENTER_EMAIL_OR_PHONE,
      isShowRequired: true,
      firstInputBox: true,
      wrapperClass: "py-10",
    },
    {
      name: toCamelCase(translation?.PASSWORD),
      label: translation?.PASSWORD,
      value: "",
      placeholder: translation?.ENTER_PASSWORD,
      isShowRequired: true,
      firstInputBox: true,
      inputType: "password",
      wrapperClass: "pb-20",
    },
  ];
  return (
    <div className="container pt-80 pb-30">
      <div className="bg-home">
        <CommonInputCard
          fields={CompanyDetailsfieldset}
          wrapperClass="banner-login-card"
          textHeadingClassName="flex flex-col"
          text={translation?.LOGIN}
          headingVariant="Maison36SemiBold125"
          headingColor="orange_accent_alpha"
          heading={translation?.USER_LOGIN}
        />
      </div>
    </div>
  );
};

export default Banner;
