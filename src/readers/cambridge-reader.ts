import axios from 'axios';

import { Reader } from '../types';

export default class HttpReader implements Reader {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async read(word: string): Promise<string> {
    const response = await axios.get(`${this.baseUrl}/${word}`);
    return response.data;
  }
}
