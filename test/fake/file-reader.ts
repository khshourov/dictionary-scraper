import * as fs from 'fs';

import { Reader, ReadingPurpose } from '../../src/types';

export default class FileReader implements Reader {
  public baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  read(word: string, purpose: ReadingPurpose): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          fs.readFileSync(
            `test/resources/cambridge/${purpose}/${word}.html`,
            'utf8',
          ),
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
