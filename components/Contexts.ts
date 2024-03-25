import { DefaultSettings } from "@/src/general/storage";
import { createContext } from "react";

export const SettingsContext = createContext({ settings: DefaultSettings, updateSettings: () => {} });