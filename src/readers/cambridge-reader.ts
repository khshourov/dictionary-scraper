import axios from 'axios';
import { AxiosError } from 'axios';

import { Reader, ReaderResponse, ReadingPurpose } from '../types';

export default class HttpReader implements Reader {
  public baseUri: string;

  constructor(baseUrl: string) {
    this.baseUri = baseUrl;
  }

  async read(
    word: string,
    purpose: ReadingPurpose = 'pronunciation',
  ): Promise<ReaderResponse | null> {
    const section = purpose === 'meaning' ? 'dictionary' : 'pronunciation';
    try {
      const url = `${this.baseUri}/${section}/english/${word}`;
      const response = await axios.get(url, {
        timeout: 60000, // 60 seconds
        /*
         * All of headers are collected from a firefox request otherwise dictionary.cambridge.org returns error.
         */
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
      });

      return { link: url, data: response.data };
    } catch (err) {
      /*
       * When cambridge can't find a word, it returns http status code 404. We returns null to indicate
       * that the searched word has not found. In all other cases, we re-throw the error to indicate something
       * that goes wrong with the request like connect/read timeout etc.
       */
      if (err instanceof AxiosError && err.status === 404) {
        return null;
      }

      throw err;
    }
  }
}
