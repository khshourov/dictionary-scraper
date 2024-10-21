import * as fs from 'fs';

import { Reader } from '../../src/types';

export default class FileReader implements Reader {
  private baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  read(word: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(fs.readFileSync(`${this.baseUri}/${word}.html`, 'utf8'));
      } catch (err) {
        reject(err);
      }
    });
  }
}
