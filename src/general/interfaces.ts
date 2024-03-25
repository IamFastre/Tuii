import themes from "@/constants/themes";

export const UserGenderOptions:UserGender[] = ["male", "female", "other"];
export const UnitsOptions:Units[] = ["metric", "imperial"];
export const ThemeOptions:Themes[] = ["system", ...Object.keys(themes) as Themes[]];

export type UserGender = "male" | "female" | "other";
export type Units      = "metric" | "imperial";
export type Themes     = "system" | keyof typeof themes;

export type StoredValue = IUser | IMetrics | IOptions;
export type StoredKey = 'user' | 'metrics' | 'options';

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
  is_fullscreen: boolean;
  type: "options";
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

