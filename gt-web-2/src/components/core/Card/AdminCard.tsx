import Link from "next/link";
import { FC, ReactNode } from "react";
import { Box, Card, Divider, ThemeUIStyleObject } from "theme-ui";
import { ThemeButton } from "../Button/Button";
import CustomText from "../Text/CustomText";

export interface AdminCardProps {
  children?: ReactNode;
  cardVariant?: string;
  cardClassName?: string;
  sx?: ThemeUIStyleObject;
  textColor?: string;
  heading?: string;
  subtitle?: string;
  footerContent?: ReactNode;
  actionButtonConfig?: {
    text: string;
    textColor?: string;
    variant?: string;
    onClick?: () => void;
    sx?: ThemeUIStyleObject;
    icon?: ReactNode;
    href?: string;
  };
}

export const AdminCard: FC<AdminCardProps> = ({
  children,
  footerContent,
  cardVariant = "selectStoreCard",
  cardClassName = "show-entire",
  sx,
  textColor = "primary_grey_800",
  heading,
  subtitle,
  actionButtonConfig,
}) => {
  return (
    <div className="pb-3">
      <div className="w-full">
        <div className="flex flex-wrap">
          <div className="w-full">
            <Card
              className={cardClassName}
              variant={cardVariant}
              sx={{
                p: 28,
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow:
                  "0px 10px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                position: "relative",
                overflow: "visible",
                maxWidth: "100%",
                width: "100%",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                  borderRadius: "16px 16px 0 0",
                },
                ...sx,
              }}
            >
              {(heading || subtitle || actionButtonConfig) && (
                <Box className="flex justify-between items-start mb-6">
                  <Box className="flex flex-col">
                    {heading && (
                      <CustomText
                        variant="font-28-demi-20"
                        color={textColor}
                        sx={{
                          marginBottom: subtitle ? "4px" : 0,
                          background:
                            "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        {heading}
                      </CustomText>
                    )}
                    {subtitle && (
                      <CustomText
                        variant="font-16-regular-20"
                        color="primary_grey_600"
                        sx={{
                          opacity: 0.8,
                          textShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                          marginBottom: "8px",
                        }}
                      >
                        {subtitle}
                      </CustomText>
                    )}
                  </Box>
                  {actionButtonConfig && (
                    <Link
                      href={actionButtonConfig?.href || "#"}
                      style={{ textDecoration: "none" }}
                    >
                      <ThemeButton
                        wrapperClassName="flex item-center"
                        text={actionButtonConfig.text}
                        textColor={actionButtonConfig.textColor || "white"}
                        variant={actionButtonConfig.variant || "primary"}
                        onClick={actionButtonConfig.onClick}
                        sx={actionButtonConfig?.sx}
                        icon={actionButtonConfig?.icon}
                      />
                    </Link>
                  )}
                </Box>
              )}
              {footerContent}
              {children}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FormSectionTitle({ title }: { title: string }) {
  return (
    <>
      <CustomText
        variant="font-24-medium-125"
        color="primary_orange_500_transparent"
      >
        {title}
      </CustomText>
      <Divider className="my-3" />
    </>
  );
}
