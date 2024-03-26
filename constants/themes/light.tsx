import { ITheme } from "./interfaces";
import defaults from './defaults';

export default {
  ...defaults,
  primary: "#eeeeee",
  secondary: "#575757",
  tertiary: "#121212",

  accent: "#00c90f",
  highlight: "#4a00ff",

  icon: "sunny",
  statusbar: "dark",
  theme: "light",
} as ITheme;
