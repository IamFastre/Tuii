import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

import { Print } from "./funcs";
import { ITicTacToe, ISudoku, IMetrics, IOptions, IUser, StoredKey, ISudokuSave } from "./interfaces";

export const DefaultSettings = {
  user: {
    name: "Stranger",
    age: 0,
    gender: "other",

    type: "user",
  } as IUser,

  metrics: {
    city: "Cairo",
    units: "metric",

    type: "metrics",
  } as IMetrics,

  options: {
    theme: "system",
    weather_icon_pack: "theme-default",
    show_refresh_button: Platform.OS === 'web',
    short_word_class: true,
    show_timezone: true,
    clock_foreground_style: "accent",
    clock_background_style: "circle",
    clock_show_dashes: true,
    clock_show_number: true,
    clock_show_digital: true,
    clock_show_icons: true,
    clock_background_affected: true,

    type: "options",
  } as IOptions,

  sudoku: {
    level: "easy",
    show_conflicts: true,
    show_empty_count: true,
    show_num_remaining: true,

    type: "sudoku",
  } as ISudoku,

  tictactoe: {
    level: "medium",
    vs_cpu: true,
    cpu_as: 2,

    type: "tictactoe",
  } as ITicTacToe,
};

export const DefaultStored = {
  ...DefaultSettings,
  sudokuSaved: null as ISudokuSave | null
};

export async function getStored<T extends StoredKey>(type: T) : Promise<typeof DefaultStored[T]> {
  try {
    let options = await AsyncStorage.getItem(type);
    if (options !== null)
      return _.merge({ }, DefaultStored[type], JSON.parse(options)) as typeof DefaultStored[T];
  } catch (e) {
    Print((e as any).toString(), 'error');
  }

  return DefaultStored[type] as typeof DefaultStored[T];
}

export async function setStored<T extends StoredKey>(type:T, value:typeof DefaultStored[T]) {
  await AsyncStorage.setItem(type, JSON.stringify(_.merge({ }, DefaultStored[type], value)));
}

export async function resetStored(type:StoredKey) {
  await setStored(type, DefaultStored[type]);
}

export async function resetSettings() {
  await AsyncStorage.multiSet(Object.entries(DefaultSettings).map(v => [v[0], JSON.stringify(v[1])]));
}

export async function resetAllStored() {
  await AsyncStorage.multiSet(Object.entries(DefaultStored).map(v => [v[0], JSON.stringify(v[1])]));
}

