import { State } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Print } from "./funcs";
import { IMetrics, IOptions, IUser, StoredKey, StoredValue } from "./interfaces";

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
    is_fullscreen: false,
    type: "options",
  } as IOptions,
};

export const DefaultStored = {
  ...DefaultSettings,
};

export async function getStored<T extends StoredValue>(type: StoredKey) {
  try {
    let options = await AsyncStorage.getItem(type);
    if (options !== null)
      return JSON.parse(options);
  } catch (e) {
    Print((e as any).toString(), 'error');
  }

  return DefaultStored[type] as T;
}

export async function setStored<T>(type:StoredKey, value:T) {
  await AsyncStorage.setItem(type, JSON.stringify(value));
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

