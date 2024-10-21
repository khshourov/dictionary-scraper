import Reader from './reader';
import Word from './word';

export default interface Scraper {
  setReader(reader: Reader): void;
  scrape(word: string): Promise<Word['entry']>;
}
