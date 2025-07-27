// 'use client'
// import { CommonConfirmationProps } from '@/types/module/core/commonModule'
// import { translation } from '@/utils/translation'
// import Modal from 'react-responsive-modal'
// import { Box, Flex, Text } from 'theme-ui'
// import { PopupModalHeader } from '../Text/Texts'
// import { ThemeButton } from '../Button/Button'
// import Spinner from '../spinner/Spinner'

// export const CommonConfirmationModal: React.FC<CommonConfirmationProps> = ({
//   isOpen = false,
//   onClose,
//   onClickSubmit,
//   submitButtonText,
//   title,
//   showCloseIcon = false,
//   isLoading,
//   description,
//   wrapperClass = 'common-Confirmation-modal',
// }) => {
//   return (
//     <Modal
//       open={isOpen}
//       onClose={() => onClose()}
//       showCloseIcon={showCloseIcon}
//       closeOnOverlayClick={true}
//       classNames={{
//         modal: wrapperClass,
//       }}
//       center
//     >
//       <PopupModalHeader title={title} />
//       <Text as="p" my="30px" className="text-center" variant="Maison16Medium20">
//         {description}
//       </Text>
//       <Box>
//         <Flex sx={{ justifyContent: 'space-between' }}>
//           <ThemeButton
//             variant=""
//             textVariant="Maison16Medium20"
//             onClick={onClickSubmit}
//           >
//             {submitButtonText}
//           </ThemeButton>
//
//         </Flex>
//       </Box>
//       <Spinner visible={isLoading} />
//     </Modal>
//   )
// }

"use client";

import { CommonConfirmationProps } from "@/types/module/core/commonModule";
import { translation } from "@/utils/translation";
import Spinner from "../spinner/Spinner";
import CommonModal from "./CommonModal";

export const CommonConfirmationModal: React.FC<CommonConfirmationProps> = ({
  isOpen = false,
  onClose,
  onClickSubmit,
  submitButtonText,
  title,
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
      submitBtnClick={onClickSubmit}
      submitBtnDisabled={isLoading}
      submitBtnVariant="secondary2"
      cancelBtnTitle={translation.CANCEL}
      submitBtnTitle={submitButtonText}
      cancelBtnDisabled={isLoading}
    >
      {/* <ThemeButton
//             textVariant="Maison16Medium20"
//             className="custom-cancel-delete-modal-button"
//             onClick={() => onClose()}
//           >
//             {translation.CANCEL}
//           </ThemeButton> */}
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
