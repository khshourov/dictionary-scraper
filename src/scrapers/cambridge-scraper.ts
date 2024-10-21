import { JSDOM } from 'jsdom';
import { Reader, Scraper, Word } from '../types';
import { IPAListings } from '../types/word';

type RegionWiseIPAInfo = {
  region: string;
  ipa: string;
  audioLink: string;
};

export default class CambridgeScraper implements Scraper {
  private reader: Reader;

  constructor(reader: Reader) {
    this.reader = reader;
  }

  setReader(reader: Reader): void {
    this.reader = reader;
  }

  async scrape(word: string): Promise<Word['entry']> {
    if (!this.reader) {
      throw new Error('Please provide a Reader instance in constructor');
    }

    const entry: Word['entry'] = {};
    const data = await this.reader.read(word, 'pronunciation');
    if (!data) return undefined;

    entry.ipa_listings = this.extractIPAListings(data);
    if (!entry.ipa_listings) return undefined;

    return entry;
  }

  private extractIPAListings(data: string): IPAListings | undefined {
    const ipaListings: IPAListings = {};

    const dom = new JSDOM(data);
    const pronunciationBlocks =
      dom.window.document.querySelectorAll('.pron-block');
    for (const pronunciationBlock of pronunciationBlocks) {
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
    }

    if (Object.keys(ipaListings).length === 0) {
      return undefined;
    }

    return ipaListings;
  }

  private extractPartsOfSpeeches(pronunciationBLock: Element): string[] {
    const partsOfSpeeches = [];
    for (const partsOfSpeechBLock of pronunciationBLock.querySelectorAll(
      '.posgram > .ti',
    )) {
      partsOfSpeeches.push(partsOfSpeechBLock.textContent ?? '');
    }

    if (partsOfSpeeches.length === 0) {
      return [''];
    }

    return partsOfSpeeches;
  }

  private extractRegionWiseIPAInfo(pronunciationBlock: Element) {
    const ipaInfo: RegionWiseIPAInfo[] = [];
    const regionBlocks = pronunciationBlock.querySelectorAll(
      '.region-block .pron-info',
    );
    for (const regionBlock of regionBlocks) {
      const region = regionBlock.getAttribute('data-pron-region');
      const ipa = regionBlock.querySelector(
        '.pron[data-title="Written pronunciation"]',
      )?.textContent;
      const audioLink = regionBlock
        .querySelector('.soundfile audio source[type="audio/mpeg"]')
        ?.getAttribute('src');
      if (region && ipa && audioLink) {
        ipaInfo.push({
          region: region.toLowerCase(),
          ipa: ipa,
          audioLink: `${this.reader.baseUri}${audioLink}`,
        });
      }
    }

    return ipaInfo;
  }
}
