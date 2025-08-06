"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { CustomModalProps } from "@/types/module/core/themuiModule";
import { X } from "lucide-react";
import React, { ReactNode } from "react";
import { Flex } from "theme-ui";
import { CustomModalBtn } from "../Button/CustomModalBtn";
import { CustomText } from "../Text";

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  footer?: boolean;
}

const CommonModal: React.FC<CommonModalProps & CustomModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  className = "",
  footer,
  ...props
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={className}>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div></div>
          <CustomText className="text-center" variant="font-18-demi-20">
            {title}
          </CustomText>
          <DialogClose asChild>
            <button
              aria-label="Close"
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </Flex>

        {description && (
          <CustomText
            as="p"
            className="text-center mt-20"
            variant="font-16-medium-20"
          >
            {description}
          </CustomText>
        )}

        {children}

        {footer && (
          <DialogFooter>
            <CustomModalBtn {...props} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommonModal;
