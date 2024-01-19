"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import English from "../locales/english";
import Vietnamese from "../locales/vietnamese";
import { getLocale } from "next-intl/server";
import { Languages } from "../constants/enum";

export type SettingsContextValue = {
	language: typeof English;
};

// Create context
export const SettingsContext = createContext<SettingsContextValue>({
	language: English,
});

export const SettingProvider = async ({ children }: { children: ReactNode }) => {
	const locale = await getLocale();

	const [language, setLanguage] = useState(Vietnamese);

	useEffect(() => {
		if (locale === Languages.English) {
			setLanguage(English);
		} else {
			setLanguage(Vietnamese);
		}
	}, [locale]);

	return <SettingsContext.Provider value={{ language }}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;
