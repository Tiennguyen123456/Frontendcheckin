"use client";

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "./EmotionCache";
import theme from "./theme";
import { ReactNode } from "react";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	const cache = createEmotionCache();
	return (
		<CacheProvider value={cache}>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
}
