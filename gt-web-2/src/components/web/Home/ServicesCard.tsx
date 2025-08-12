"use client";
import FeatureList from "@/components/core/Card/FeatureListCard";
import featureData from "@/utils/constant";
import { translation } from "@/utils/translation";

const ServicesCard = () => {
  return (
    <FeatureList
      titleVariant="font-24-demi-30"
      headingWrapperClassName="mb-4 text-center"
      descriptionVariant="font-18-medium-20"
      descColor="primary-grey-500"
      titleColor="primary-blue-900"
      headingColor="primary-orange-500-transparent"
      data={featureData}
      heading={translation?.WHY_WITH_US}
      containerClassName="why-choose-inner-area my-30"
    />
  );
};

export default ServicesCard;
