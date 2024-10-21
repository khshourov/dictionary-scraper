import axios from 'axios';

import { Reader, ReadingPurpose } from '../types';

export default class HttpReader implements Reader {
  public baseUri: string;

  constructor(baseUrl: string) {
    this.baseUri = baseUrl;
  }

  async read(
    word: string,
    purpose: ReadingPurpose = 'pronunciation',
  ): Promise<string> {
    const section = purpose === 'meaning' ? 'dictionary' : 'pronunciation';
    const response = await axios.get(
      `${this.baseUri}/${section}/english/${word}`,
    );
    return response.data;
  }
}
