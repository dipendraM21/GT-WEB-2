import { ReactNode } from "react";

export type SubMenuItem = {
  title: string;
  path: string;
  icon: ReactNode;
  isMultiOption: boolean;
};

export type MenuItem = {
  id: string;
  title: string;
  path: string;
  icon: ReactNode;
  isSubOption: boolean;
  subOption?: SubMenuItem[];
};
