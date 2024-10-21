import Word from './word';

export default interface Scraper {
  scrape(data: string): Word['ipa_listings'];
}
