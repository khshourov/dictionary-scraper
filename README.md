<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/khshourov/dictionary-scraper">
    <img src="docs/icon.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">Dictionary Scraper</h3>
  <p align="center">
    Online dictionary scraper for the node.js and browser
    <br />
    <a href="https://github.com/khshourov/dictionary-scraper/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/khshourov/dictionary-scraper/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/khshourov/dictionary-scraper/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=">Request Feature</a>
  </p>

  <!-- PROJECT SHIELDS -->
  [![CI](https://github.com/khshourov/dictionary-scraper/actions/workflows/ci.yml/badge.svg)](https://github.com/khshourov/dictionary-scraper/actions/workflows/ci.yml)
  [![codecov](https://codecov.io/gh/khshourov/dictionary-scraper/graph/badge.svg?token=CJZ8KKBS0Y)](https://codecov.io/gh/khshourov/dictionary-scraper)
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#package-manager">Package Manager</a></li>
        <li><a href="#cdn">CDN</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Scrape online dictionaries to retrieve the IPA, definitions and examples sentences of a word.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Package manager

Using npm:

```bash
$ npm install dictionary-scraper
```

Using yarn:

```bash
$ yarn add dictionary-scraper
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { DictionaryScraper, Scraper } from 'dictionary-scraper';
```

You can also use the default export:

```js
import DictionaryScraper from 'dictionary-scraper';

const scraper = new DictionaryScraper();
````

If you use `require` for importing:

```js
const DictionaryScraper = require('dictionary-scraper');

const scraper = new DictionaryScraper.DictionaryScraper();
```

### CDN

Using unpkg CDN:

```html
<script src="https://unpkg.com/dictionary-scraper/dist/dictionary-scraper.min.js"></script>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

```js
 // Create a DictionaryScraper instance
 const scraper = new DictionaryScraper();

 // Call search method to fetch the lexical records
 console.log(scraper.search('hello'));
 {
   source: 'cambridge',
   name: 'hello',
   entry: {
     ipaListings: {
       us: [{ category: '', ipa: '/heˈloʊ/', audio: 'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',}, ],
       uk: [{ category: '', ipa: '/heˈləʊ/', audio: 'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',}, ],
     },
     meanings: [{
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
           ...
        ],
       },
       ...
     ],
   }
}
```
Full response sample can be found in [docs/example-respopnse-hello.json](https://github.com/khshourov/dictionary-scraper/blob/main/docs/example-response-hello.json) and [docs/example-response-present.json](https://github.com/khshourov/dictionary-scraper/blob/main/docs/example-response-present.json).
<br />
See [docs](https://github.com/khshourov/dictionary-scraper/wiki) for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add wiktionary

See the [open issues](https://github.com/khshourov/dictionary-scraper/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kamrul H Shourov - shourov.kamrul@gmail.com

Project Link: [https://github.com/khshourov/dictionary-scraper](https://github.com/khshourov/dictionary-scraper)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Great starter guide to build an NPM package](https://www.totaltypescript.com/how-to-create-an-npm-package)
* [Another good resource for building an NPM package](https://dev.to/charperbonaroo/creating-a-ts-written-npm-package-for-use-in-node-js-or-browser-5gm3)
* [Cambridge Online Dictionary](https://dictionary.cambridge.org/)
* [Dictionary icons created by Smashicons - Flaticon](https://www.flaticon.com/free-icons/dictionary)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
