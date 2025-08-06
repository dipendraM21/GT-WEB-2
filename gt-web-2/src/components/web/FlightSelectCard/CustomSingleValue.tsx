import { CustomText } from "@/components/core/Text";
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
import { SingleValueProps, components } from "react-select";

interface CustomSingleValueProps extends SingleValueProps<any, false> {
  onClickClear?: () => void;
}

export const CustomSingleValue: FC<CustomSingleValueProps> = ({
  data,
  innerProps,
  onClickClear,
  ...props
}) => {
  return (
    <components.SingleValue {...props} data={data} innerProps={innerProps}>
      <div {...innerProps} className="flex justify-between items-center">
        <CustomText variant="font-20-semiBold-125" color="primary-grey-900">
          {data.label}
        </CustomText>
        <div>
          <RxCross2
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              onClickClear && onClickClear();
            }}
          />
        </div>
      </div>
    </components.SingleValue>
  );
};
