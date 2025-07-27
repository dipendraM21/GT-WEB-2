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
import { Flex, Text } from "theme-ui";
import { CustomModalBtn } from "../Button/CustomModalBtn";

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
          <Text className="text-center" variant="Maison18Demi111">
            {title}
          </Text>
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
          <Text
            as="p"
            my="20px"
            className="text-center"
            variant="Maison16Medium20"
          >
            {description}
          </Text>
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
