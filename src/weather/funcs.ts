import axios, { AxiosError } from 'axios';
import { State, Units, Print, DefaultStored } from '@/src/general';
import { IForecast } from "./interfaces"

var lastUpdated:number | undefined = undefined;

export async function fetchWeather(city:string, units_system:Units, set:State<IForecast | null>) {
  const q     = city ?? DefaultStored['metrics'].city,
        units = units_system ?? DefaultStored['metrics'].units,
        appid = process.env.EXPO_PUBLIC_WEATHER_KEY ?? "",
        url   = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=${appid}`;

  const now = Date.now();
  if (lastUpdated && (now - lastUpdated <= 2500)) {
    Print("Weather not refreshed; give it sometime");
    return;
  }

  try {
    const response = await axios.get<IForecast>(url);

    set({
      ...response.data,
      main: {
        ...response.data.main,
        feels_like_difference: Math.round((response.data.main.temp - response.data.main.feels_like)*10)/10,
      },
      units
    });

    Print("Weather refreshed");

  } catch (e) {
    let error = e as AxiosError;
    Print((e as any).toString(), 'error');
    set(null)
    throw error;
  }

  lastUpdated = now;
}
