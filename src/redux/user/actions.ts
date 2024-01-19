import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin } from "../../models/api/auth-api";
import authApi from "../../services/auth-api";
import userApi from "../../services/user-api";

export const getProfile = createAsyncThunk("user/profile", async (_body, thunkAPI) => {
	try {
		const response = await userApi.getProfile();
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
