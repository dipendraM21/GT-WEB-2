import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { Box } from "theme-ui";
import { CustomText } from "../Text";

interface FeatureListProps {
  heading?: string;
  headingVariant?: string;
  headingClassName?: string;
  gridWrapperClassName?: string;
  headingWrapperClassName?: string;
  mainClassName?: string;
  containerClassName?: string;
  cardClassName?: string;
  iconWrapperClassName?: string;
  titleVariant?: string;
  descriptionVariant?: string;
  descColor?: string;
  iconClassName?: string;
  headingColor?: string;
  titleColor?: string;
  data: {
    icon: StaticImageData;
    heading: string;
    description: string;
  }[];
}
const FeatureList: FC<FeatureListProps> = ({
  heading,
  headingVariant = "font-36-medium-44",
  descColor,
  headingWrapperClassName = "text-center mb-10",
  headingClassName,
  gridWrapperClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14",
  mainClassName = "why-choose-us-area my-30",
  containerClassName = "container mx-auto why-choose-inner-area",
  cardClassName = "single-box bg-white p-6 shadow-md rounded-lg text-center",
  iconWrapperClassName = "text-center mb-4 flex items-center justify-center",
  titleVariant,
  descriptionVariant,
  data,
  iconClassName,
  titleColor,
  headingColor,
}) => {
  return (
    <Box as="div" className={mainClassName}>
      <div className={containerClassName}>
        <Box as="div" className={headingWrapperClassName}>
          <CustomText
            color={headingColor}
            variant={headingVariant}
            className={`${headingClassName}`}
          >
            {heading}
          </CustomText>
          {/* <div className="heading-divider w-16 h-[3px] bg-primary-grey-300 mx-auto mt-2"></div> */}
        </Box>

        <Box as="div" className={gridWrapperClassName}>
          {data?.length > 0 &&
            data?.map((item, idx) => (
              <div className={cardClassName} key={idx}>
                <div className={iconWrapperClassName}>
                  <Image
                    src={item?.icon}
                    className={iconClassName}
                    width={70}
                    alt={`item-icon-${idx}`}
                  />
                </div>
                <CustomText
                  color={titleColor}
                  variant={titleVariant}
                  className="text-xl font-semibold text-gray-700"
                >
                  {item?.heading}
                </CustomText>
                <CustomText
                  as="p"
                  color={descColor}
                  variant={descriptionVariant}
                  className="text-gray-500 mt-2"
                >
                  {item?.description}
                </CustomText>
              </div>
            ))}
        </Box>
      </div>
    </Box>
  );
};

export default FeatureList;
