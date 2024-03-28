import axios from 'axios';
import { IForecast } from "./interfaces"
import { State } from '../general/types';
import { Units } from '../general/interfaces';
import { Print } from '../general/funcs';
import { DefaultStored } from '../general/storage';

var lastUpdated:number | undefined = undefined;

export async function fetchWeather(city:string | undefined, units:Units | undefined, set:State<IForecast>) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city ?? DefaultStored['metrics'].city}&units=${units ?? DefaultStored['metrics'].units}&appid=e2b654197a0b322446ef267c83c71a2a`;

  const now = Date.now();
  if (lastUpdated && (now - lastUpdated <= 2500)) {
    Print("Weather not refreshed; give it sometime");
    return;
  }

  try {
    const response = await axios.get(url);

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
    Print((e as any).toString(), 'error');
    throw e;
  }

  lastUpdated = now;
}
