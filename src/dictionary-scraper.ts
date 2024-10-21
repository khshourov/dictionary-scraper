import { CambridgeReader } from './readers';
import { CambridgeScraper } from './scrapers';
import { Source, Word, Reader, Scraper } from './types';

export default class DictionaryScraper {
  private readonly channels: Source[] = ['cambridge'];
  private readonly scrapers: Map<Source, Scraper> = new Map();

  constructor() {
    const cambridgeReader = new CambridgeReader(
      'https://dictionary.cambridge.org',
    );
    this.scrapers.set('cambridge', new CambridgeScraper(cambridgeReader));
  }

  registerReader(source: Source, reader: Reader): void {
    this.scrapers.get(source)?.setReader(reader);
  }

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
