import themes from "@/constants/themes";
import { DefaultSettings } from '@/src/general/storage';

export const UserGenderOptions:UserGender[] = ["male", "female", "other"];
export const UnitsOptions:Units[] = ["metric", "imperial"];
export const ThemeOptions:Themes[] = ["system", ...Object.keys(themes) as Themes[]];

export type UserGender = "male" | "female" | "other";
export type Units      = "metric" | "imperial";
export type Themes     = "system" | keyof typeof themes;

export type StoredValue = IUser | IMetrics | IOptions;
export type StoredKey = keyof typeof DefaultSettings;

export interface IUser {
  name: string;
  gender: UserGender;
  age: number;
  type: "user";
}

export interface IMetrics {
  city: string;
  units: Units;
  type: "metrics";
}

export interface IOptions {
  theme: Themes;
  show_refresh_button: boolean;
  short_word_class: boolean;
  type: "options";
}

export interface IApplets {
  sudoku: {
    level: "easy" | "medium" | "hard" | number;
    show_conflicts: boolean;
    show_remaining: boolean;
    show_num_count: boolean;
  }
  type: "applets";
}

export interface ITime {
  obj: Date;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface ILocation {
  longitude: number;
  latitude: number;
}

