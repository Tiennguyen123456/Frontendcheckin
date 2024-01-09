import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../../models/User";
import { RootState } from "../root/store";
import { getProfile } from "./actions";

export interface UserState {
	userProfile: IUserProfile | undefined;
}

const initialState: UserState = {
	userProfile: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
			state.userProfile = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
