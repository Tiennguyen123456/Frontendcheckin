import { useContext } from "react";
import { SettingsContext, SettingsContextValue } from "../contexts/settings.context";

export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
