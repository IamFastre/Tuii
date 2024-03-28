import axios, { AxiosError } from 'axios';

import { IDefinition, IMeaning, IWord, PartOfSpeech, POS, POSRecord } from "./interfaces"
import { ITime } from '@/src/general/interfaces';
import { State } from '@/src/general/types';
import { hashDateToLength, Print } from '@/src/general/funcs';

import list from  "@/library/list.json";

export async function fetchDict(time:ITime, set:State<IWord>) {
  const i   = hashDateToLength(time, list.length);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${list[i]}`;

  try {
    const response = await axios.get<IWord[]>(url);

    set(response.data[response.data.length > 1 ? hashDateToLength(time, response.data.length) : 0]);
    Print("Today's Word refreshed");

  } catch (e) {
    let error = e as AxiosError;
    Print((e as any).toString(), 'error');
    throw error;
  }
}

export function getMeaning(word:IWord, time:ITime) : IMeaning {
  const mi = hashDateToLength(time, word.meanings.length);
  return word.meanings[mi];
}

export function getDefinition(word:IWord, time:ITime) : IDefinition {
  const meaning = getMeaning(word, time);
  const di = hashDateToLength(time, meaning.definitions.length);
  return meaning.definitions[di];
}

export function getClass(word:IWord, time:ITime, short:boolean = false) : PartOfSpeech | POS {
  return short ? POSRecord[getMeaning(word, time).partOfSpeech] : getMeaning(word, time).partOfSpeech;
}

export function getPhonetic(word:IWord) : `/${string}/` {
  if (word.phonetic)
    return word.phonetic;
  else {
    for (let i = 0; i < word.phonetics.length; i++) {
      if (word.phonetics[i].text)
        return word.phonetics[i].text
    }
  }
  return "/?/";
}