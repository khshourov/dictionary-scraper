import { DictionaryScraper, Word } from '../../src';

describe('Cambridge dictionary web scrapping', () => {
  const VALID_MULTI_CATEGORY_WORD = 'present'; // By multi category, we mean word can be noun, verb, adjective etc
  const VALID_SINGLE_PURPOSE_WORD = 'hello';
  const NONSENSICAL_WORD = 'prisencolinensinainciusol';

  let scraper = new DictionaryScraper();

  test('scraper should return expected data for valid single category word', async () => {
    const ret = await scraper.search(VALID_SINGLE_PURPOSE_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: 'cambridge',
      name: VALID_SINGLE_PURPOSE_WORD,
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

  test('scraper should return expected data for valid multi category word', async () => {
    const ret = await scraper.search(VALID_MULTI_CATEGORY_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: 'cambridge',
      name: VALID_MULTI_CATEGORY_WORD,
      entry: {
        ipa_listings: {
          us: [
            {
              category: 'noun',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
            },
            {
              category: 'adjective',
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
          ],
          uk: [
            {
              category: 'noun',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo020.mp3',
            },
            {
              category: 'adjective',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo020.mp3',
            },
            {
              category: 'verb',
              ipa: '/prɪˈzent/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo021.mp3',
            },
          ],
        },
        meanings: [
          {
            categories: 'noun',
            entries: [
              {
                meaning:
                  'something that you are given, without asking for it, on a special occasion, especially to show friendship, or to say thank you:',
                examples: [
                  'a birthday/Christmas/wedding present',
                  'They gave me theatre tickets as a present.',
                ],
              },
              {
                meaning:
                  'the period of time that is happening now, not the past or the future:',
                examples: [
                  "That's all for the present.",
                  'in the present The play is set in the present.',
                ],
              },
              {
                meaning:
                  'the form of the verb that is used to show what happens or exists now:',
                examples: [
                  'in the present The verb in this sentence is in the present.',
                  'His English is basic, and he always speaks in the present.',
                  'It is interesting that she uses the present, not the past, when talking about her relationship with Brad.',
                ],
              },
              {
                meaning: 'now:',
                examples: ['"Are you busy?" "Not at present."'],
              },
            ],
          },
          {
            categories: 'adjective',
            entries: [
              {
                meaning: 'in a particular place:',
                examples: [
                  'The whole family was present.',
                  'There were no children present.',
                ],
              },
              {
                meaning: 'happening or existing now:',
                examples: [
                  "I don't have her present address.",
                  'Please state your present occupation and salary.',
                ],
              },
            ],
          },
          {
            categories: 'verb',
            entries: [
              {
                meaning: 'to give, provide, or make something known:',
                examples: [
                  'be presented with The winners were presented with medals.',
                  'present someone with a problem The letter presented the family with a problem that would be difficult to solve.',
                  'present someone with something The documentary presented us with a balanced view of the issue.',
                  'present something to someone He presented the report to his colleagues at the meeting.',
                  'The classroom presented a cheerful busy atmosphere to the visitors (= appeared to them to have this).',
                  'The school is presenting (= performing) "West Side Story" as its end-of-term production.',
                ],
              },
              {
                meaning: 'to introduce a television or radio show:',
                examples: ['She presents the late-night news.'],
              },
              {
                meaning: 'to introduce a person:',
                examples: [
                  'May I present Professor Carter?',
                  "present someone to someone Later on I'd like to present you to the headteacher.",
                ],
              },
              {
                meaning: 'to arrive somewhere and introduce yourself:',
                examples: [
                  "He presented himself at the doctor's at 9.30 a.m. as arranged.",
                  "You should present yourselves at the front desk at 8 o'clock in the morning.",
                  'He presented himself to the Criminal Tribunal in The Hague.',
                  'She presented herself at the abbey to begin her life as a nun.',
                  'I presented myself to the supervisor, eager to begin work.',
                ],
              },
              {
                meaning: 'If something presents itself, it happens:',
                examples: [
                  'An opportunity suddenly presented itself.',
                  'When a challenge to his authority presented itself, he dealt with it firmly.',
                  'She opted for cash over comfort whenever the choice presented itself.',
                  'I would be open to taking up a directorship should the right opportunity present itself.',
                  'After a couple of successful years, a new hurdle presented itself.',
                ],
              },
              {
                meaning:
                  'to show or describe someone or something in a particular way:',
                examples: [
                  'present someone/something as something EU leaders presented the agreement as a victory for all.',
                  'He presented himself as someone who knows his rights.',
                  'Make sure you present your complaint in a way that sounds constructive, not critical.',
                ],
              },
              {
                meaning:
                  'to see a doctor, etc. when showing particular signs of an illness or medical condition :',
                examples: [
                  'present with Children presenting with acute respiratory infections were referred for a chest X-ray.',
                  'present with When patients present with chest pain, clinical examination and patient history are fundamental to determine the probable cause of pain.',
                ],
              },
              {
                meaning: '(of an illness) to show itself in a particular way:',
                examples: [
                  'Medical conditions might present differently during pregnancy.',
                  'present as Bone cancer generally presents as pain in the area of the tumour.',
                ],
              },
            ],
          },
        ],
      },
    });
  });

  test('scraper should return null for nonsensical word', async () => {
    const ret = await scraper.search(NONSENSICAL_WORD);

    expect(ret).toBeNull();
  });
});
