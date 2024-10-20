import { Scraper, Word } from '../types';

export default class CambridgeScraper implements Scraper {
  scrape(_data: string): Word['ipa_listings'] | undefined {
    return {
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
    };
  }
}
