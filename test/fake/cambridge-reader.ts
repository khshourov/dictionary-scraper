import * as fs from 'fs';

import { Reader, ReadingPurpose } from '../../src/types';

export default class CambridgeReader implements Reader {
  public baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  read(word: string, purpose: ReadingPurpose): Promise<string> {
    const section = purpose === 'pronunciation' ? 'pronunciation' : 'meaning';
    return new Promise((resolve, reject) => {
      try {
        resolve(
          fs.readFileSync(
            `test/resources/cambridge/${section}/${word}.html`,
            'utf8',
          ),
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
