import { CustomText } from "@/components/core/Text";
import { FC, ReactNode } from "react";
import { components, PlaceholderProps } from "react-select";

interface CustomPlaceholderProps extends PlaceholderProps<any, false> {
  placeholder: string;
  icon: ReactNode;
}
export const CustomPlaceholder: FC<CustomPlaceholderProps> = ({
  icon,
  placeholder,
  ...props
}) => {
  return (
    <components.Placeholder {...props}>
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <CustomText color="grey_medium" variant="font-18-medium-125">
          {placeholder}
        </CustomText>
      </div>
    </components.Placeholder>
  );
};
