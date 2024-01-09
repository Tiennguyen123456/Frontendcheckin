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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isSideBarCollapse } = useAppSelector(selectCommon);

  let screenWidth = useWindowSize();

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

  useEffect(() => {
    handleChangeDeviceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  useEffect(() => {
    dispatch(getProfile());
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
