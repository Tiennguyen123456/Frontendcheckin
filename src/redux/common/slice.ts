import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../root/store";
import { DeviceType } from "../../constants/enum";

export interface CommonState {
	isSideBarCollapse: boolean;
	isSideBarToggle: boolean;
	deviceType: DeviceType;
}

const initialState: CommonState = {
	isSideBarCollapse: false,
	isSideBarToggle: false,
	deviceType: DeviceType.Desktop,
};

export const commonSlice = createSlice({
	name: "common",
	initialState,
	reducers: {
		toggleCollapseSideBar: (state) => {
			state.isSideBarCollapse = !state.isSideBarCollapse;
		},
		toggleSideBar: (state) => {
			state.isSideBarToggle = !state.isSideBarToggle;
			state.isSideBarCollapse = false;
		},
		changeDeviceType: (state, action: PayloadAction<DeviceType>) => {
			state.deviceType = action.payload;
			state.isSideBarCollapse = false;
			state.isSideBarToggle = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { toggleCollapseSideBar, changeDeviceType, toggleSideBar } = commonSlice.actions;

export const selectCommon = (state: RootState) => state.common;

export default commonSlice.reducer;
