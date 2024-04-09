import themes from "@/constants/themes";
import { DefaultSettings } from '@/src/general/storage';

export const UserGenderOptions:UserGender[] = ["male", "female", "other"];
export const UnitsOptions:Units[] = ["metric", "imperial"];
export const ThemeOptions:Themes[] = ["system", ...Object.keys(themes) as Themes[]];
export const SudokuLevelOptions:SudokuLevel[] = ["easy", "medium", "hard", "max"];
export const TTTLevelOptions:TTTLevel[] = ["easy", "medium", "hard"];

export type UserGender  = "male" | "female" | "other";
export type Units       = "metric" | "imperial";
export type Themes      = "system" | keyof typeof themes;
export type SudokuLevel = "easy" | "medium" | "hard" | "max";
export type TTTLevel = "easy" | "medium" | "hard";

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

export interface ISudoku {
  level: SudokuLevel;
  show_conflicts: boolean;
  show_empty_count: boolean;
  show_num_remaining: boolean;
  type: "sudoku";
}

export interface ITicTacToe {
  level: TTTLevel;
  type: "tictactoe";
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

