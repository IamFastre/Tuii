import { useContext } from "react";
import { useColorScheme } from "react-native";
import { ITheme } from "./themes/interfaces";
import { SettingsContext } from "@/components/Contexts";
import { DefaultSettings } from "@/src/general/storage";
import themes from "./themes";

export function useColors(settings?:typeof DefaultSettings) : ITheme {
  return {...themes[useTheme(settings)]};
}

export function useTheme(settings?:typeof DefaultSettings) : keyof typeof themes {
  const { options } = settings ?? useContext(SettingsContext).settings;
  const system = useColorScheme();

  return (options.theme === "system" ? system : options.theme) ?? "dark";
}
