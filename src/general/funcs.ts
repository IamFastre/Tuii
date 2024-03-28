import { Alert, BackHandler, Platform } from "react-native";
import Constants from "expo-constants";
import { ITime } from "./interfaces";
import { setStatusBarHidden } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';

export type PrintLevel = 'log' | 'warn' | 'error';

export function Print(message:string, level:PrintLevel = 'log') {
  if (level === 'log')
    console.log(`[${Constants.deviceName}-${Platform.OS}(${Platform.Version ?? "??"})@${new Date().toISOString()}] ${message}`);
  else if (level === 'warn')
    console.warn(`[${Constants.deviceName}-${Platform.OS}(${Platform.Version ?? "??"})@${new Date().toISOString()}] ${message}`);
  else
    console.error(`[${Constants.deviceName}-${Platform.OS}(${Platform.Version ?? "??"})@${new Date().toISOString()}] ${message}`);
}

export function Exit() {
  if (Platform.OS == "ios")
    Alert.alert("No.", "Sadly you can't do that in iOS, just swipe out of the app.");
  else
    BackHandler.exitApp();
}

export function getTime() : ITime {
  let currentdate = new Date();

  return {
    obj: currentdate,
    year: currentdate.getFullYear(),
    month: currentdate.getMonth() + 1,
    day: currentdate.getDate(),
    hour: currentdate.getHours(),
    minute: currentdate.getMinutes(),
    second: currentdate.getSeconds(),
  };
}

export function getGreet() : string {
  let hr = getTime().hour;
  return hr >=  5 && hr < 12
       ? "Good morning"
       : hr >= 12 && hr < 17
       ? "Good afternoon"
       : "Good evening"
}

export function normalize(str:string) : string {
  return str.toLowerCase()
    .replace(/^./, c => c.toUpperCase())
    .replace(/[\.\!\?]\s+./, c => c.toUpperCase())
    .replace(/[^\.\!\?]$/, c => c+".")
    .replaceAll(" s ", "’s ")
    .replaceAll(" re ", "’re ")
    .replaceAll(" don t ", " don’t ")
    .replaceAll(" can t ", " can’t ")
    .replaceAll(" i ", " I ")
    .replaceAll("'", "’");
}

export function capitalize(str:string) : string {
  let chars = str.split('');
  chars[0] = chars[0].toUpperCase();
  return chars.join('');
}

export function updateFullscreen(fullscreen: boolean) {
  setStatusBarHidden(fullscreen);
  if (Platform.OS == 'android') {
    NavigationBar.setVisibilityAsync(fullscreen ? "hidden" : "visible");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }
}

export function isHexColor(value:any) {
  return typeof value === "string" && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
}

export function hashToLength(len: number, ...list: number[]): number {
  list.sort((a, b) => a - b);
  let val = (list.shift() ?? 2 << 16);
  list.forEach(e => val ^= e);
  return val % len;
}

export function hashDateToLength(date:ITime, len:number) : number {
  return hashToLength(len, date.day, date.month, date.year);
}