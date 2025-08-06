import { ThemeUIStyleObject } from "theme-ui";
import CustomText from "../Text/CustomText";

interface Props {
  label?: string;
  labelVariant?: string;
  labelSx?: ThemeUIStyleObject;
  handleSwitchOnChange: (event: boolean | string) => void;
  isChecked: boolean;
  switchName: string;
  labelClass?: string;
  labelColor?: string;
}

const CommonSwitch = ({
  label,
  labelVariant,
  labelSx,
  handleSwitchOnChange,
  isChecked = false,
  switchName,
  labelColor,
  labelClass,
}: Props) => {
  return (
    <div className="switch-container">
      {label && (
        <CustomText
          className={labelClass}
          color={labelColor}
          variant={labelVariant}
          sx={{}}
        >
          {label}
        </CustomText>
      )}
      <label className="custom-ticket-switch">
        <input
          type="checkbox"
          name={switchName}
          checked={isChecked}
          onChange={(e) => {
            handleSwitchOnChange(e?.target?.value);
          }}
        />
        <span className="custom-ticket-slider custom-ticket-round"></span>
      </label>
    </div>
  );
};

export default CommonSwitch;
