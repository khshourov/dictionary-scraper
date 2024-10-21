import { JSDOM } from 'jsdom';
import { Scraper, Word } from '../types';

type RegionWiseIPAInfo = {
  region: string;
  ipa: string;
  audioLink: string;
};

export default class CambridgeScraper implements Scraper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  scrape(data: string): Word['ipa_listings'] {
    const ipaListings: Word['ipa_listings'] = {};

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
          audioLink: `${this.baseUrl}${audioLink}`,
        });
      }
    }

    return ipaInfo;
  }
}
