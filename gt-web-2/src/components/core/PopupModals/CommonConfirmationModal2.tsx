"use client";

import { CommonConfirmationProps } from "@/types/module/core/commonModule";
import Spinner from "../spinner/Spinner";
import CommonModal from "./CommonModal";

export const CommonConfirmationModals22: React.FC<CommonConfirmationProps> = ({
  isOpen = false,
  onClose,
  onClickSubmit,
  submitButtonText,
  title,
  showCloseIcon = false,
  isLoading = false,
  description,
  wrapperClass = "common-Confirmation-modal",
}) => {
  return (
    <CommonModal
      open={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      className={wrapperClass}
      footer
    >
      {/* <Box>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <ThemeButton
            variant="secondary2"
            textVariant="Maison16Medium20"
            onClick={onClickSubmit}
            disabled={isLoading}
          >
            {submitButtonText}
          </ThemeButton>

          <ThemeButton
            textVariant="Maison16Medium20"
            className="custom-cancel-delete-modal-button"
            onClick={onClose}
            disabled={isLoading}
          >
            {translation.CANCEL}
          </ThemeButton>
        </Flex>
      </Box> */}

      <Spinner visible={isLoading} />
    </CommonModal>
  );
};
