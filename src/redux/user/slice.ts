import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../../models/User";
import { RootState } from "../root/store";
import { getProfile } from "./actions";

export interface UserState {
  userProfile: IUserProfile | null;
}

const initialState: UserState = {
  userProfile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<IUserProfile>) => {
        state.userProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.userProfile = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
