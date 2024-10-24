import { JSDOM } from 'jsdom';

import { Reader, Scraper } from '../types';
import {
  IPAListings,
  WordMeaning,
  CategoryMeaningEntry,
  DictionaryEntry,
} from '../types/word';
import { cleanWord } from '../lib';
import { CambridgeReader } from '../readers';

export default class CambridgeScraper implements Scraper {
  private reader: Reader;

  constructor() {
    this.reader = new CambridgeReader('https://dictionary.cambridge.org');
  }

  setReader(reader: Reader): void {
    if (
      !reader ||
      typeof reader.read !== 'function' ||
      typeof reader.baseUri !== 'string'
    ) {
      throw new Error('reader must implement Reader interface');
    }

    this.reader = reader;
  }

  async scrape(word: string): Promise<DictionaryEntry | undefined> {
    if (!this.reader) {
      throw new Error('Please provide a Reader instance in constructor');
    }

    word = cleanWord(word);
    if (word.length === 0) {
      throw new Error('A single non-empty alphabetic string is required');
    }

    const entry: DictionaryEntry = {};
    const data = await this.reader.read(word, 'pronunciation');
    if (!data) return undefined;

    entry.ipa_listings = this.extractIPAListings(data);
    if (!entry.ipa_listings) return undefined;

    entry.meanings = [];
    const dictionaryData = await this.reader.read(word, 'meaning');
    if (dictionaryData) {
      entry.meanings = this.extractMeanings(dictionaryData);
    }

    return entry;
  }

  private extractIPAListings(data: string): IPAListings | undefined {
    const ipaListings: IPAListings = {};

    const dom = new JSDOM(data);
    Array.from(dom.window.document.querySelectorAll('.pron-block')).forEach(
      (pronunciationBlock) => {
        const partsOfSpeeches = this.extractPartsOfSpeeches(pronunciationBlock);

        const regionWiseIPAInfo =
          this.extractRegionWiseIPAInfo(pronunciationBlock);
        for (const ipaInfo of regionWiseIPAInfo) {
          for (const partsOfSpeech of partsOfSpeeches) {
            if (!ipaListings[ipaInfo.region]) {
              ipaListings[ipaInfo.region] = [];
            }

            ipaListings[ipaInfo.region]?.push({
              category: partsOfSpeech,
              ipa: ipaInfo.ipa,
              audio: ipaInfo.audioLink,
            });
          }
        }
      },
    );

    if (Object.keys(ipaListings).length === 0) {
      return undefined;
    }

    return ipaListings;
  }

  private extractMeanings(data: string): WordMeaning[] {
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Selecting UK dictionary section; currently we're ignoring American and business English
    const ukDictionary = document.querySelector('.pr.dictionary .di-body');
    if (!ukDictionary) {
      throw new Error('No UK dictionary section found');
    }

    return Array.from(ukDictionary.querySelectorAll('.pr .entry-body__el')).map(
      (categoryBlock) => this.extractCategory(categoryBlock),
    );
  }

  private extractPartsOfSpeeches(pronunciationBLock: Element): string[] {
    const partsOfSpeeches = Array.from(
      pronunciationBLock.querySelectorAll('.posgram > .ti'),
    ).map((partsOfSpeechBlock) => partsOfSpeechBlock.textContent ?? '');
    if (partsOfSpeeches.length === 0) {
      return [''];
    }

    return partsOfSpeeches;
  }

  private extractRegionWiseIPAInfo(pronunciationBlock: Element) {
    return Array.from(
      pronunciationBlock.querySelectorAll('.region-block .pron-info'),
    )
      .map((regionBlock) => {
        const region = regionBlock.getAttribute('data-pron-region');
        const ipa = regionBlock.querySelector(
          '.pron[data-title="Written pronunciation"]',
        )?.textContent;
        const audioLink = regionBlock
          .querySelector('.soundfile audio source[type="audio/mpeg"]')
          ?.getAttribute('src');
        if (region && ipa && audioLink) {
          return {
            region: region.toLowerCase(),
            ipa: ipa,
            audioLink: `${this.reader.baseUri}${audioLink}`,
          };
        }

        return null;
      })
      .filter((each) => each !== null);
  }

  private extractCategory(categoryBlock: Element): WordMeaning {
    return {
      categories:
        categoryBlock.querySelector('.pos-header .posgram')?.textContent ?? '',
      entries: Array.from(
        categoryBlock.querySelectorAll('.pos-body .pr.dsense .def-block'),
      ).map((meaningBlock) => this.extractMeaning(meaningBlock)),
    };
  }

  private extractMeaning(meaningBlock: Element): CategoryMeaningEntry {
    return {
      meaning:
        meaningBlock.querySelector('.ddef_h .def')?.textContent?.trim() ?? '',
      examples: Array.from(
        meaningBlock.querySelectorAll('.def-body .examp'),
      ).map((exampleBlock) => exampleBlock?.textContent?.trim() ?? ''),
    };
  }
}
