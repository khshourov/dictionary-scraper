import { Reader } from '../../src/types';

export default class TimeoutReader implements Reader {
  public baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  read(_word: string): Promise<string> {
    return new Promise((_resolve, reject) => {
      reject(new Error('Read timeout'));
    });
  }
}
