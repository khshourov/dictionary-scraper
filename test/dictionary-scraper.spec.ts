import { DictionaryScraper, FileReader, Word } from '../src';

describe('Cambridge dictionary web scrapping', () => {
  const VALID_MULTI_PURPOSE_WORD = 'present'; // By multi purpose, we mean word can be noun, verb, adjective etc
  let scraper = new DictionaryScraper();
  beforeAll(() => {
    scraper.registerReader(
      'cambridge',
      new FileReader('test/resources/cambridge'),
    );
  });

  test('scraper should return expected data for valid multi purpose word', async () => {
    const ret = await scraper.search(VALID_MULTI_PURPOSE_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: 'cambridge',
      name: VALID_MULTI_PURPOSE_WORD,
      ipa_listings: {
        us: [
          {
            category: 'noun',
            ipa: '/ˈprez.ənt/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
          },
          {
            category: 'verb',
            ipa: '/prɪˈzent/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_02_00.mp3',
          },
          {
            category: 'adjective',
            ipa: '/ˈprez.ənt/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
          },
        ],
        uk: [
          {
            category: 'noun',
            ipa: '/ˈprez.ənt/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
          },
          {
            category: 'verb',
            ipa: '/prɪˈzent/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_02_00.mp3',
          },
          {
            category: 'adjective',
            ipa: '/ˈprez.ənt/',
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
          },
        ],
      },
    });
  });
});
