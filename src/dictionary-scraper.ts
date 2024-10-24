import { cleanWord } from './lib';
import { CambridgeScraper } from './scrapers';
import { Source, Word, Scraper, SourceConst } from './types';
import { DictionaryEntry } from './types/word';

/**
 * Scrape online dictionaries to retrieve the IPA, definitions and examples sentences of a word
 *
 * @class
 * @example
 * >> const scraper = new DictionaryScraper();
 * >> console.log(scraper.search('hello'));
 * {
     source: 'cambridge',
     name: 'hello',
     entry: {
       ipa_listings: {
         us: [{ category: '', ipa: '/heˈloʊ/', audio: 'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',}, ],
         uk: [{ category: '', ipa: '/heˈləʊ/', audio: 'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',}, ],
       },
       meanings: [{
           categories: 'exclamation, noun',
           entries: [
             {
               meaning: 'used when meeting or greeting someone:',
               examples: [
                 "Hello, Paul. I haven't seen you for ages.",
                 "I know her vaguely - we've exchanged hellos a few times.",
                 "say hello I just thought I'd call by and say hello.",
                 "a big hello And a big hello (= welcome) to all the parents who've come to see the show.",
               ],
             },
             ...
          ],
         },
         ...
       ],
     }
 * Full response sample can be found in docs/example-respopnse-hello.json and docs/example-response-present.json.
 */
export default class DictionaryScraper {
  private readonly scrapers: Map<Source, Scraper> = new Map();

  /**
   * Set readers and scrapers
   * @constructor
   */
  constructor() {
    this.scrapers.set(SourceConst.CAMBRIDGE, new CambridgeScraper());
  }

  /**
   * Set a scraper against a source
   *
   * @param {Source} source
   * @param {Scraper} scraper
   * @returns {void}
   */
  registerScraper(source: Source, scraper: Scraper): void {
    if (typeof source !== 'string' || (source = source.trim()).length === 0) {
      throw new Error('source must be a string');
    }
    if (!scraper || typeof scraper.scrape !== 'function') {
      throw new Error('scraper must implement Scraper interface');
    }

    this.scrapers.set(source, scraper);
  }

  /**
   * Scrape online dictionaries and returns lexical records.
   *
   * The search method will sequentially check each online dictionary source (currently, only Cambridge is supported) to find lexical records for the word.
   * Once a record is found, it stops searching and returns immediately. If no records are found after checking all sources, it returns null.
   * Exceptions may be thrown for various reasons, such as connection or read timeouts, data parsing errors, and more.
   *
   * @param {string} word - Word to search (Multi words not supported right now)
   * @returns {Promise<Word | null>}
   */
  async search(word: string): Promise<Word | null> {
    word = cleanWord(word);
    if (word.length === 0) {
      throw new Error('A single non-empty alphabetic string is required');
    }

    let error;
    for (const [channel, scraper] of this.scrapers) {
      const ret: Word = {
        source: channel,
        name: word,
      };
      try {
        ret.entry = await scraper.scrape(word);
      } catch (err) {
        error = err;
      }

      if (this.validateLexicalEntry(ret.entry)) return ret;
    }

    if (error) {
      throw error;
    }

    return null;
  }

  private validateLexicalEntry(entry: DictionaryEntry | undefined): boolean {
    return (
      entry !== null &&
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      Object.getPrototypeOf(entry) === Object.prototype &&
      ('ipa_listings' in entry || 'meanings' in entry)
    );
  }
}
