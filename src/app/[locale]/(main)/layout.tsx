"use client";
import { Box, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/root/hooks";
import useWindowSize from "../../../hooks/useWindowSize";
import { ScreenWidth } from "../../../constants/variables";
import CustomSideBar from "../../../components/layout/SideBar";
import TopBar from "../../../components/layout/TopBar";
import { DeviceType } from "../../../constants/enum";
import { changeDeviceType } from "../../../redux/common/slice";

export default function MainLayout({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

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

	return (
		<Box className="flex h-dvh overflow-hidden">
			<TopBar />
			<CustomSideBar />
			<Box component={"main"} className={`grow min-h-screen bg-[#f5f5f5] w-[calc(100% - 300px)]`}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}
