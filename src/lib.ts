export function cleanWord(word: string) {
  if (!word || typeof word !== 'string') {
    word = '';
  }

  return word.replace(/[^a-zA-Z]/g, '').toLowerCase();
}
