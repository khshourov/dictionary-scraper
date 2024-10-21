import { CambridgeReader } from './readers';
import { CambridgeScraper } from './scrapers';
import { Source, Word, Reader, Scraper } from './types';

export default class DictionaryScraper {
  private readonly channels: Source[] = ['cambridge'];
  private readonly scrapers: Map<Source, Scraper> = new Map();
  private readers: Map<Source, Reader> = new Map();

  constructor() {
    this.scrapers.set(
      'cambridge',
      new CambridgeScraper('https://dictionary.cambridge.org'),
    );
    this.readers.set(
      'cambridge',
      new CambridgeReader('https://dictionary.cambridge.org'),
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
            const ipa_listings = this.scrapers
              .get(channel as Source)
              ?.scrape(data);
            if (ipa_listings) {
              ret.ipa_listings = ipa_listings;
            }
          }
        } catch (err) {}
      }

      if (ret.ipa_listings) return ret;
    }

    return null;
  }
}
