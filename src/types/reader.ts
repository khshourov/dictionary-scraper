export type ReadingPurpose = 'pronunciation' | 'meaning' | 'both';
export type ReaderResponse = {
  link: string;
  data: string;
};
export default interface Reader {
  baseUri: string;
  read: (
    word: string,
    purpose: ReadingPurpose,
  ) => Promise<ReaderResponse | null>;
}
