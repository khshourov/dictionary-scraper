export function cleanWord(word: string) {
  if (!word || typeof word !== 'string') {
    word = '';
  }

  return word
    .trim()
    .replace(/[ ']/g, '-')
    .replace(/[^a-zA-Z-]/g, '')
    .toLowerCase();
}
