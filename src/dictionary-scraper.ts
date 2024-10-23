import { CambridgeReader } from './readers';
import { CambridgeScraper } from './scrapers';
import { Source, Word, Reader, Scraper } from './types';

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
  private readonly channels: Source[] = [Source.CAMBRIDGE];
  private readonly scrapers: Map<Source, Scraper> = new Map();

  /**
   * Set readers and scrapers
   * @constructor
   */
  constructor() {
    const cambridgeReader = new CambridgeReader(
      'https://dictionary.cambridge.org',
    );
    this.scrapers.set(Source.CAMBRIDGE, new CambridgeScraper(cambridgeReader));
  }

  /**
   * Set a reader against a source
   *
   * The Reader essentially retrieves a response from a URI and returns the results for a specific source, such as the Cambridge Online Dictionary.
   * The DictionaryScraper class already provides a default reader for each source, and in most cases, you won’t need to use this method to register your own version.
   * There are two main reasons for this method’s existence:
   *
   * 1.	The default reader will be updated as needed when circumstances change. However, if you prefer not to update or upgrade, you can create and register a custom reader using this method.
   * 2.	For unit testing purposes, you can provide a mock reader so that the scraper does not need to connect to the internet.
   *
   * @param {Source} source
   * @param {Reader} reader
   * @returns {void}
   */
  registerReader(source: Source, reader: Reader): void {
    this.scrapers.get(source)?.setReader(reader);
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
    let error;
    for (const channel of this.channels) {
      const ret: Word = {
        source: channel as Source,
        name: word,
      };
      if (this.scrapers.has(channel as Source)) {
        try {
          ret.entry = await this.scrapers.get(channel as Source)?.scrape(word);
        } catch (err) {
          error = err;
        }
      }

      if (ret.entry) return ret;
    }

    if (error) {
      throw error;
    }

    return null;
  }
}
