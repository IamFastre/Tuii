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
  if (Platform.OS === "ios")
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
    .replaceAll(/^./g, c => c.toUpperCase())
    .replaceAll(/[\.\!\?]\s+./g, c => c.toUpperCase())
    .replaceAll(/[^\.\!\?]$/g, c => c+".")
    .replaceAll(" s ", "’s ")
    .replaceAll(" re ", "’re ")
    .replaceAll(" don t ", " don’t ")
    .replaceAll(" can t ", " can’t ")
    .replaceAll(" i ", " I ");
}

export function capitalize(str:string) : string {
  let chars = str.split('');
  chars[0] = chars[0].toUpperCase();
  return chars.join('');
}

export function updateFullscreen(fullscreen: boolean) {
  setStatusBarHidden(fullscreen);
  if (Platform.OS === 'android') {
    NavigationBar.setVisibilityAsync(fullscreen ? "hidden" : "visible");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }
}

export function isHexColor(value:any) {
  return typeof value === "string" && (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
}

export function hashToLength(len: number, ...list: number[]): number {
  list.sort((a, b) => a - b);
  let first = 0;
  let val = first = (list.shift() ?? 2 << 16);
  list.forEach(e => val ^= e);
  return cyrb53(val.toString(), len % first) % len;
}

export function hashDateToLength(date:ITime, len:number) : number {
  return hashToLength(len, date.day, date.month, date.year);
}

export function cyrb53(str:string, seed:number = 0) : number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function getRandomNumber(min:number, max:number) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function move(toNext: boolean) {
  return toNext ? next : prev;
}

export function next<T>(list: T[], current: T) {
  return list[((list.indexOf(current) + 1) % list.length)];
}

export function prev<T>(list: T[], current: T) {
  return list[((list.length + list.indexOf(current) - 1) % list.length)];
}

export function deepCopy<T>(v:T) : T {
  return JSON.parse(JSON.stringify(v)) as T;
}