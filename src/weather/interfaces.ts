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

// interface OneCallResponse {
//   lat: number;
//   lon: number;
//   timezone: string;
//   timezone_offset: number;
//   current: CurrentWeather;
//   hourly: HourlyWeather[];
//   daily: DailyWeather[];
// }

// interface CurrentWeather extends Forecast {
//   sunrise: number;
//   sunset: number;
// }

// interface HourlyWeather extends Forecast {
//   pop: number;
// }

// interface DailyWeather extends Omit<Forecast, 'temp' | 'feels_like' | 'rain' | 'snow'> {
//   sunrise: number;
//   sunset: number;
//   moonrise: number;
//   moonset: number;
//   moon_phase: number;
//   summary: string;
//   temp: {
//     morn: number;
//     day: number;
//     eve: number;
//     night: number;
//     min: number;
//     max: number;
//   };
//   feels_like: {
//     morn: number;
//     day: number;
//     eve: number;
//     night: number;
//   };
//   pop: number;
//   rain?: number;
//   snow?: number;
// }

// interface WeatherDescription {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// }

// interface Forecast {
//   dt: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   uvi: number;
//   clouds: number;
//   visibility: number;
//   wind_speed: number;
//   wind_deg: number;
//   wind_gust?: number;
//   rain?: {
//     "1h": number;
//   };
//   snow?: {
//     "1h": number;
//   };
//   weather: WeatherDescription[];
// }
