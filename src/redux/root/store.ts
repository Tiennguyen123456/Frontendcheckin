"use client";
import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../common/slice";

export const store = configureStore({
	reducer: {
		common: commonSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
