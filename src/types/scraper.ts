import Reader from './reader';
import { DictionaryEntry } from './word';

export default interface Scraper {
  setReader?: (reader: Reader) => void;
  scrape(word: string): Promise<DictionaryEntry | undefined>;
}
