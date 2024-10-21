export type ReadingPurpose = 'pronunciation' | 'meaning' | 'both';
export default interface Reader {
  baseUri: string;
  read: (word: string, purpose: ReadingPurpose) => Promise<string | null>;
}
