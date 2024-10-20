import Source from './source';

export type IPAInfo = {
  category: string;
  ipa: string;
  audio: string;
};

type Word = {
  source: Source;
  name: string;
  ipa_listings?:
    | {
        us?: IPAInfo[];
        uk?: IPAInfo[];
      }
    | undefined;
};

export default Word;
