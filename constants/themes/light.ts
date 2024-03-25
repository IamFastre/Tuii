import { ITheme } from "./interfaces";
import defaults from './defaults';

export default {
  ...defaults,
  main: "#eeeeee",
  main_2: "#575757",
  main_3: "#121212",

  accent: "#00c90f",
  accent_2: "#4a00ff",

  other_hot: "#d71e1e",
  other_cold: "#0a57ff",

  red: "#d71e1e",
  green: "#00c90f",
  blue: "#0a57ff",

  icon: "sunny",
  statusbar: "dark",
  mode: "light",
} as ITheme;
