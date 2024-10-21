import Source from './source';

export type IPAInfo = {
  category: string;
  ipa: string;
  audio: string;
};

export type CategoryMeaningEntry = {
  meaning: string;
  example: string[];
};

export type WordMeaning = {
  category: string;
  entries: CategoryMeaningEntry[];
};

export type IPAListings = {
  [key in string]: IPAInfo[];
};

type Word = {
  source: Source;
  name: string;
  entry?:
    | {
        ipa_listings?: IPAListings | undefined;
        meanings?: WordMeaning[];
      }
    | undefined;
};

export default Word;
