import { Reader, ReaderResponse } from '../../src/types';

export default class TimeoutReader implements Reader {
  public baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  read(_word: string): Promise<ReaderResponse> {
    return new Promise((_resolve, reject) => {
      reject(new Error('Read timeout'));
    });
  }
}
