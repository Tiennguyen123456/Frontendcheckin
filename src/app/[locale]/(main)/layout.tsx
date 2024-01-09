"use client";
import { Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/root/hooks";
import useWindowSize from "../../../hooks/useWindowSize";
import { ScreenWidth } from "../../../constants/variables";
import CustomSideBar from "../../../components/layout/SideBar";
import TopBar from "../../../components/layout/TopBar";
import { DeviceType } from "../../../constants/enum";
import { changeDeviceType, selectCommon } from "../../../redux/common/slice";
import { getProfile } from "../../../redux/user/actions";
import { toastError } from "../../../utils/toast";
import { useTranslations } from "next-intl";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // ** Redux
  const dispatch = useAppDispatch();
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  // ** I18n
  const translation = useTranslations();

  // ** Custom Hook
  let screenWidth = useWindowSize();

  // ** Functions
  const handleChangeDeviceType = () => {
    if (screenWidth) {
      if (screenWidth < ScreenWidth.sm) {
        dispatch(changeDeviceType(DeviceType.Mobile));
      } else if (screenWidth >= ScreenWidth.sm && screenWidth < ScreenWidth.lg) {
        dispatch(changeDeviceType(DeviceType.Tablet));
      } else {
        dispatch(changeDeviceType(DeviceType.Desktop));
      }
    }
  };

  const handleGetUserProfile = async () => {
    try {
      await dispatch(getProfile()).unwrap();
    } catch (error: any) {
      console.log("error: ", error);
      const data = error?.response?.data;
      if (data?.message_code) {
        toastError(translation(`errorApi.${data?.message_code}`));
      } else {
        toastError(translation("errorApi.GET_USER_PROFILE_FAILED"));
      }
    }
  };

  useEffect(() => {
    handleChangeDeviceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  useEffect(() => {
    handleGetUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="flex h-dvh overflow-hidden">
      <TopBar />
      <CustomSideBar />
      <Box
        component={"main"}
        className={`grow min-h-screen bg-[#efefef] ${
          isSideBarCollapse ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]"
        }`}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
