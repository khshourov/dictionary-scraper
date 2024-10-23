import axios from 'axios';

import { Reader, ReadingPurpose } from '../types';
import { AxiosError } from 'axios';

export default class HttpReader implements Reader {
  public baseUri: string;

  constructor(baseUrl: string) {
    this.baseUri = baseUrl;
  }

  async read(
    word: string,
    purpose: ReadingPurpose = 'pronunciation',
  ): Promise<string | null> {
    const section = purpose === 'meaning' ? 'dictionary' : 'pronunciation';
    try {
      const response = await axios.get(
        `${this.baseUri}/${section}/english/${word}`,
        {
          timeout: 60000, // 60 seconds
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            Referer: 'https://www.google.com/',
            Connection: 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
          },
        },
      );

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 404) {
        return null;
      }

      throw err;
    }
  }
}
