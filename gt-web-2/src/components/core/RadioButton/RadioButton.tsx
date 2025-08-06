import { ThemeUIStyleObject } from "theme-ui";
import CustomText from "../Text/CustomText";

export interface OptionType<T = string> {
  label: T;
  value: T;
}

export interface RadioButtonProps<T> {
  options: OptionType<T>[];
  defaultValue?: T;
  textClass?: string;
  textColor?: string;
  lableClass?: string;
  mainClass?: string;
  customClassName?: string;
  onChange?: (value: T) => void;
  name: string;
  variant?: string;
  selectedValue?: T;
  textSx?: ThemeUIStyleObject;
}

const CommonRadioButton = <T extends string | number | boolean = string>({
  options,
  defaultValue,
  lableClass = "radio-label",
  textClass,
  textColor,
  variant = "font-16-regular-20",
  mainClass,
  customClassName,
  onChange,
  name,
  selectedValue,
  textSx,
}: RadioButtonProps<T>) => {
  return (
    <div className={mainClass}>
      {options.map((option: OptionType<T>) => (
        <div
          key={String(option.value)}
          className="radio-item"
          onClick={() => onChange && onChange(option.value)}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="radio"
            id={String(option.value)}
            name={name}
            value={String(option.value)}
            checked={selectedValue === option.label}
            onChange={(e) => onChange && onChange(e.target.value as T)}
            className={customClassName}
            style={{ cursor: "pointer" }}
          />
          <label htmlFor={String(option.value)} className={lableClass}>
            <CustomText
              className={textClass}
              color={textColor}
              variant={variant}
              sx={{}}
            >
              {String(option.label)}
            </CustomText>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CommonRadioButton;
