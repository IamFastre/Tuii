import themes from "@/constants/themes";
import { DefaultStored } from '@/src/general/storage';
import { iconPacks } from "@/components/weather/WeatherIcons";
import { Position, SudokuGrid } from "@/src/sudoku";

export const UserGenderOptions:UserGender[] = ["male", "female", "other"];
export const UnitsOptions:Units[] = ["metric", "imperial"];
export const ThemeOptions:Themes[] = ["system", ...Object.keys(themes) as Themes[]];
export const WeatherIPsOptions:WeatherIP[] = ["theme-default", ...Object.keys(iconPacks) as WeatherIP[]];

export const SudokuLevelOptions:SudokuLevel[] = ["easy", "medium", "hard", "max"];

export const TTTLevelOptions:TTTLevel[] = ["easy", "medium", "hard"];
export const TTTPlayers:TTTPlayer[] = [1, 2];

export type UserGender  = "male" | "female" | "other";
export type Units       = "metric" | "imperial";
export type Themes      = "system" | keyof typeof themes;
export type WeatherIP   = "theme-default" | keyof typeof iconPacks;
export type ClockFGStyle  = "analogs" | "accent" | "highlight";
export type ClockBGStyle  = "circle" | "square";

export type SudokuLevel = "easy" | "medium" | "hard" | "max";

export type TTTPlayer = 1 | 2;
export type TTTLevel = "easy" | "medium" | "hard";

export type StoredKey = keyof typeof DefaultStored;
export type StoredValue = typeof DefaultStored[StoredKey];

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
  weather_icon_pack: WeatherIP;
  show_refresh_button: boolean;
  short_word_class: boolean;
  show_timezone: boolean;
  clock_foreground_style: ClockFGStyle;
  clock_background_style: ClockBGStyle;
  clock_show_dashes: boolean;
  clock_show_number: boolean;
  clock_show_digital: boolean;
  clock_show_icons: boolean;
  clock_background_affected: boolean;

  type: "options";
}

export interface ISudoku {
  level: SudokuLevel;
  show_conflicts: boolean;
  show_empty_count: boolean;
  show_num_remaining: boolean;
  type: "sudoku";
}

export interface ISudokuSave {
  level: SudokuLevel;
  solution: SudokuGrid;
  board: SudokuGrid;
  poked: Position[];
  revealed: Position[];
  type: "sudokuSave";
}

export interface ITicTacToe {
  level: TTTLevel;
  vs_cpu: boolean;
  cpu_as: TTTPlayer;
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
  offset: number;
  offsetH: number;
  offsetM: number;
  stamp: number;
}

export interface ILocation {
  longitude: number;
  latitude: number;
}

