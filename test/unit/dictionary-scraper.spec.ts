import { DictionaryScraper, Source, Word } from '../../src';
import CambridgeReader from '../fake/cambridge-reader';

const scraper = new DictionaryScraper();

describe('DictionaryScraper::search()', () => {
  const VALID_WORD = 'Hello';
  const NONSENSICAL_WORD = 'prisencolinensinainciusol';

  beforeAll(() => {
    scraper.registerReader(
      Source.CAMBRIDGE,
      /*
        We have to set real base-url as CambridgeScraper use that base-url
        base-url to generate full audio-link. Without setting proper base-url
        will result in failed test.
      */
      new CambridgeReader('https://dictionary.cambridge.org'),
    );
  });

  test('search should return expected data', async () => {
    const ret = await scraper.search(VALID_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: Source.CAMBRIDGE,
      name: VALID_WORD.toLowerCase(),
      entry: {
        ipa_listings: {
          us: [
            {
              category: '',
              ipa: '/heˈloʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
            },
          ],
          uk: [
            {
              category: '',
              ipa: '/heˈləʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
            },
          ],
        },
        meanings: [
          {
            categories: 'exclamation, noun',
            entries: [
              {
                meaning: 'used when meeting or greeting someone:',
                examples: [
                  "Hello, Paul. I haven't seen you for ages.",
                  "I know her vaguely - we've exchanged hellos a few times.",
                  "say hello I just thought I'd call by and say hello.",
                  "a big hello And a big hello (= welcome) to all the parents who've come to see the show.",
                ],
              },
              {
                meaning:
                  'something that is said at the beginning of a phone conversation:',
                examples: [
                  '"Hello, I\'d like some information about flights to the US, please."',
                ],
              },
              {
                meaning:
                  "something that is said to attract someone's attention:",
                examples: [
                  'The front door was open so she walked inside and called out, "Hello! Is there anybody in?"',
                ],
              },
              {
                meaning:
                  'said to someone who has just said or done something stupid, especially something that shows they are not noticing what is happening:',
                examples: [
                  'She asked me if I\'d just arrived and I was like "Hello, I\'ve been here for an hour."',
                ],
              },
              {
                meaning: 'an expression of surprise:',
                examples: ['Hello, this is very strange - I know that man.'],
              },
            ],
          },
        ],
      },
    });
  });

  test('search should return null for nonsensical word', async () => {
    const ret = await scraper.search(NONSENSICAL_WORD);

    expect(ret).toBeNull();
  });
});

describe('DictionaryScraper::registerReader()', () => {
  test.each([
    [undefined],
    [null],
    [''],
    ['  '],
    ['multi word'],
    [[]],
    [{}],
    [['some', 'words']],
    [{ key: 'value' }],
    [() => {}],
  ])('given %s, registerReader should throw error', async (invalidSource) => {
    await expect(async () =>
      scraper.registerReader(
        // @ts-expect-error: For JS only
        invalidSource,
        new CambridgeReader('https://dictionary.cambridge.org'),
      ),
    ).rejects.toThrowError(Error);
  });

  test('registerReader should throw error if reader does not implement Reader interface', async () => {
    const reader = () => {};

    await expect(async () =>
      // @ts-expect-error: For JS only
      scraper.registerReader(Source.CAMBRIDGE, reader),
    ).rejects.toThrowError(Error);
  });
});
