"use client";
import errorPageBgImage from "@/../public/images/error-img.png";
import "@/app/(web)/globals.css";
import "@/styles/error-page.css";
import "@/styles/flex-class.css";
import "@/styles/fonts.css";
import "@/styles/navbar.css";
import "@/styles/popup-modal.css";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box } from "theme-ui";
import { ThemeButton } from "../Button/Button";
import CustomText from "../Text/CustomText";

const PageNotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(appRoutes.home);
  };
  return (
    <>
      <Box variant="styles.bgFlowerPatternCenter">
        <div className="page-not-found-container">
          <Image
            className="error-page-img"
            src={errorPageBgImage}
            alt="errorPageBgImage"
          />
          <CustomText
            as="p"
            variant="font-60-demi-125"
            className="text-center"
            color="#3E3E3E"
          >
            {translation?.ERROR_PAGE_TITLE}
          </CustomText>
          <CustomText
            as="p"
            className="text-center"
            variant="font-22-regular-28"
            sx={{
              width: "50%",
              margin: "auto",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            {translation?.ERROR_PAGE_DESC}
          </CustomText>

          <ThemeButton
            variant="secondary3"
            textVariant="font-18-demi-20"
            textSx={{ color: "white" }}
            sx={{ maxWidth: ["240px", "300px", "340px", "360px"] }}
            text={translation?.RETURN_HOME}
            onClick={handleClick}
          />
        </div>
      </Box>
    </>
  );
};

export default PageNotFound;
