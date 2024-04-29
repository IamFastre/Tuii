import axios, { AxiosError } from 'axios';
import { IForecast } from "./interfaces"
import { State } from '../general/types';
import { Units } from '../general/interfaces';
import { Print } from '../general/funcs';
import { DefaultStored } from '../general/storage';

const API_KEY = "e2b654197a0b322446ef267c83c71a2a";
var lastUpdated:number | undefined = undefined;

export async function fetchWeather(city:string, units:Units, set:State<IForecast | null>) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ?? DefaultStored['metrics'].city}&units=${units ?? DefaultStored['metrics'].units}&appid=${API_KEY}`;

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
