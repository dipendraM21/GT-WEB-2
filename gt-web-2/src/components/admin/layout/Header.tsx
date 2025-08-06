"use client";
import gtLogo from "@/../public/images/gt-logo.png";
import { CommonConfirmationModal } from "@/components/core/PopupModals/CommonConfirmationModal";
import { CustomText } from "@/components/core/Text";
import { logout } from "@/store/actions/auth.action";
import { getBalance } from "@/store/actions/balance.action";
import { MainStoreType } from "@/types/store/reducers/main.reducers";
import { ACCESS_TOKEN } from "@/utils/constant";
import {
  capitalizeFirstLetter,
  setInitialStorageState,
} from "@/utils/functions";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "theme-ui";
import BalanceInfo from "./BalanceInfo";
import { DropDown } from "./DropDown";

export default function Header() {
  const dispatch = useDispatch();
  const getUserData = useSelector(
    (state: MainStoreType) => state.userData.currentUserData
  );
  const authData = useSelector((state: MainStoreType) => state.authUserData);
  const { balanceData } = useSelector(
    (state: MainStoreType) => state.balanceData
  );
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleClickLogout = () => {
    setIsLogout(true);
  };

  const handleClickSubmit = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    if (accessToken) {
      dispatch(
        logout(accessToken, async (res) => {
          if (res) {
            setInitialStorageState();
            window.location.replace(appRoutes?.login);
          }
        })
      );
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShowDropDown(false);
      }
    }
    if (isShowDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowDropDown]);

  useEffect(() => {
    dispatch(getBalance());
  }, []);
  useEffect(() => {
    if (isLogout) {
      setIsShowDropDown(false);
    }
  }, [isLogout]);

  return (
    <>
      <div className="container-fluid main-wrapper items-center">
        <div className="row align-items-center header z-800">
          <div className="col-auto header-left">
            <Link href="/admin-dashboard" className="logo">
              <Image src={gtLogo} alt="gtLogo" />
            </Link>
          </div>
          <Box as="div" className="col-auto ms-auto d-flex align-items-center">
            <Box as="div" className="d-flex align-items-center me-4">
              <BalanceInfo
                availableBalance={balanceData?.availableBalance || 0}
                creditLimit={balanceData?.creditLimit || 0}
                due={balanceData?.due || 0}
              />
            </Box>
            <Box
              as="div"
              className="admin-header-right-container"
              onClick={handleClick}
              sx={{ backgroundColor: isShowDropDown && "#EEEE" }}
            >
              <Box as="div" className="user-names">
                <CustomText
                  variant="font-20-medium-125"
                  color="primary-blue-700"
                >
                  {capitalizeFirstLetter(getUserData?.userName as string)}
                </CustomText>
                <CustomText
                  color="primary-blue-600-alpha"
                  as="h3"
                  variant="font-16-medium-125"
                  className="text-end"
                >
                  {translation?.ADMIN}
                </CustomText>
              </Box>
              <Box as="div" className="user-image-container">
                <FaRegUser size={30} color="#333548bf" />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      {isShowDropDown && (
        <DropDown ref={dropdownRef} handleClickLogout={handleClickLogout} />
      )}

      <CommonConfirmationModal
        isOpen={isLogout}
        onClose={() => {
          setIsLogout(false);
        }}
        onClickSubmit={handleClickSubmit}
        submitButtonText={translation?.LOGOUT}
        title={translation?.CONFIRM_LOGOUT}
        description={translation?.LOGOUT_DESC}
        isLoading={authData?.loading}
      />
    </>
  );
}
