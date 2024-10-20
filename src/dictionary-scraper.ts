import { CambridgeReader } from './readers';
import { CambridgeScraper } from './scrapers';
import { Source, Word, Reader, Scraper } from './types';

export default class DictionaryScrapper {
  private readonly channels: Source[] = ['cambridge'];
  private readonly scrapers: Map<Source, Scraper> = new Map();
  private readers: Map<Source, Reader> = new Map();

  constructor() {
    this.scrapers.set('cambridge', new CambridgeScraper());
    this.readers.set(
      'cambridge',
      new CambridgeReader(
        'https://dictionary.cambridge.org/pronunciation/english',
      ),
    );
  }

  registerReader(source: Source, reader: Reader): void {
    this.readers.set(source, reader);
  }

  async search(word: string): Promise<Word | null> {
    for (const channel of this.channels) {
      const ret: Word = {
        source: channel as Source,
        name: word,
      };
      if (this.readers.has(channel as Source)) {
        try {
          const data = await this.readers.get(channel as Source)?.read(word);
          if (data) {
            ret.ipa_listings = this.scrapers
              .get(channel as Source)
              ?.scrape(data);
          }
        } catch (err) {}
      }

      if (ret.ipa_listings) return ret;
    }

    return null;
  }
}
