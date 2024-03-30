import AsyncStorage from "@react-native-async-storage/async-storage";
import { Print } from "./funcs";
import { IApplets, IMetrics, IOptions, IUser, StoredKey, StoredValue } from "./interfaces";

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
    show_refresh_button: false,
    short_word_class: true,

    type: "options",
  } as IOptions,

  applets: {
    sudoku: {
      level: "easy",
      show_conflicts: true,
      show_remaining: true,
      show_num_count: true,
    },

    type: "applets",
  } as IApplets,
};

export const DefaultStored = {
  ...DefaultSettings,
};

export async function getStored<T extends StoredValue>(type: StoredKey) {
  try {
    let options = await AsyncStorage.getItem(type);
    if (options !== null)
      return { ...DefaultStored[type], ...JSON.parse(options) };
  } catch (e) {
    Print((e as any).toString(), 'error');
  }

  return DefaultStored[type] as T;
}

export async function setStored<T>(type:StoredKey, value:T) {
  await AsyncStorage.setItem(type, JSON.stringify({ ...DefaultSettings[type], ...value }));
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

