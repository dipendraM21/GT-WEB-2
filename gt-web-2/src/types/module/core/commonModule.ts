import { DrawerProps } from "antd";
import { DrawerStyles } from "antd/es/drawer/DrawerPanel";
import { Placement } from "rc-drawer/lib/DrawerPopup";
import { ReactNode } from "react";
import { ThemeUIStyleObject } from "theme-ui";
import { CustomStyleProps } from "./customStyleTypes";

export interface TermsCheckboxProps {
  wrapperSx?: ThemeUIStyleObject;
  wrapperClass?: string;
  textClass?: string;
  text: string;
  textVariant?: string;
  termsLabel: string;
  privacyLabel: string;
  checked: boolean;
  textSx?: CustomStyleProps;
  onChange: (value: boolean) => void;
}

export enum RegisterAs {
  AGENT = "Agent",
  ADMIN = "Admin",
  DISTRIBUTOR = "Distributor",
  NORMAL_USER = "NormalUser",
  NORMAL_ADMIN = "NormalAdmin",
}

export interface SpinnerProps {
  visible: boolean;
  size?: number;
  sx?: ThemeUIStyleObject;
}

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
  DEFAULT = "default",
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface ErrorApiResponse {
  error: boolean;
  message: string;
  success: boolean;
  status: number;
}

export type PropsParam = {
  params: { [key: string]: string };
};

export interface CommonFillterData {
  label: string;
  key: string;
}

export interface NavItemsProps {
  name: string;
  href: string;
}

export interface Country {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: Timezone[];
}

export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface QueryValue {
  name?: string;
  [key: string]: string | undefined;
}

export interface QueryParameter {
  key: string;
  value: string;
}
export interface AdminHeaderProps {
  icon: string | ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export interface CommonConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onClickSubmit: () => void;
  closeIcon?: string;
  modalContainer?: string;
  wrapperClass?: string;
  submitButtonText?: string;
  title: string;
  description: string;
  isLoading: boolean;
  showCloseIcon?: boolean;
  modal?: React.CSSProperties;
}

export type CaseType =
  | "toUpperCase"
  | "toLowerCase"
  | "capitalize"
  | "camelCase"
  | "kebabCase"
  | "snakeCase"
  | "titleCase";

export interface TransformCaseOptions {
  value: string;
  caseType: CaseType;
}

export interface CityOption {
  value: string;
  label: string;
  code: string;
  customLabel?: string;
  customLabelVariant?: string;
}

export interface CommonDrawerModalProps extends DrawerProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  placement?: Placement;
  styles?: DrawerStyles;
}
