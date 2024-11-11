import Source from './source';

export type IPAInfo = {
  category: string;
  ipa: string;
  audio: string;
};

export type CategoryMeaningEntry = {
  meaning: string;
  examples: string[];
};

export type WordMeaning = {
  categories: string;
  entries: CategoryMeaningEntry[];
};

export type IPAListings = {
  [key in string]: IPAInfo[];
};

export type DictionaryEntry = {
  sourceLinks?: string[];
  ipaListings?: IPAListings | undefined;
  meanings?: WordMeaning[];
};

type Word = {
  source: Source;
  sourceLinks: string[];
  name: string;
  entry?: DictionaryEntry | undefined;
};

export default Word;
