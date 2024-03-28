export interface IWord  {
  word: string;
  phonetic: `/${string}/`;
  phonetics: IPhonetic[];
  meanings: IMeaning[];
}

export interface IPhonetic {
  text: `/${string}/`;
  audio: string;
}

export interface IMeaning {
  partOfSpeech: PartOfSpeech;
  definitions: IDefinition[]
  synonyms: string[];
  antonyms: string[];
}

export interface IDefinition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export type PartOfSpeech = "noun" | "pronoun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "interjection" | "???";
export type POS = "n" | "pron" | "v" | "adj" | "adv" | "prep" | "conj" | "interj" | "?";

export const POSRecord:Record<PartOfSpeech, POS> = {
  noun: "n",
  pronoun: "pron",
  verb: "v",
  adjective: "adj",
  adverb: "adv",
  preposition: "prep",
  conjunction: "conj",
  interjection: "interj",
  "???": "?",
};