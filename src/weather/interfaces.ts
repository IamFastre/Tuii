import { Units } from "../general/interfaces";

export interface IForecast {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain
  visibility: number;
  wind: IWind
  clouds: IClouds;
  rain?: IRain;
  snow?: IRain;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  units: Units;
}


export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: WeatherIconID;
}

export interface IMain {
  temp: number;
  feels_like: number;
  feels_like_difference: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface IWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface IClouds {
  all: number;
}

export interface IRain {
  "1h"?: number;
  "3h"?: number;
}

export interface ISys {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export type WeatherIconID = "01d"
                          | "02d"
                          | "03d"
                          | "04d"
                          | "09d"
                          | "10d"
                          | "11d"
                          | "13d"
                          | "50d"
                          | "01n"
                          | "02n"
                          | "03n"
                          | "04n"
                          | "09n"
                          | "10n"
                          | "11n"
                          | "13n"
                          | "50n";
