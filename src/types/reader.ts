export default interface Reader {
  read: (word: string) => Promise<string>;
}
