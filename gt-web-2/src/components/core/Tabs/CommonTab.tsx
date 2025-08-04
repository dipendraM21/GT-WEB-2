"use client";
import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";
import { Box } from "theme-ui";
import { CustomText } from "../Text";

interface Tab {
  key: string;
  label: string;
  iconSrc?: string;
  IconComponent?: IconType;
}

interface ProfilePageHeaderProps {
  tabs: Tab[];
  activeTab: string;
  textVariant?: string;
  textColor?: string;
  customTabClass?: string;
  iconSize?: number;
  iconClass?: string;
  wrapperClass?: string;
  setActiveTab?: (key: string) => void;
}

const CommonTab: React.FC<ProfilePageHeaderProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  textVariant = "Maison16Medium20",
  textColor = "primary-orange-500-transparent",
  customTabClass,
  iconSize = 20,
  wrapperClass = "profile-page-header",
  iconClass,
}) => {
  return (
    <Box className={wrapperClass}>
      <div className={`tabs ${customTabClass}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab && setActiveTab(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "8px",
            }}
          >
            {tab.iconSrc && (
              <Image src={tab.iconSrc} alt={tab.label} width={20} height={20} />
            )}

            {tab.IconComponent && (
              <tab.IconComponent className={iconClass} size={iconSize} />
            )}

            <CustomText color={textColor} variant={textVariant}>
              {tab.label}
            </CustomText>
          </button>
        ))}
      </div>
    </Box>
  );
};

export default CommonTab;
