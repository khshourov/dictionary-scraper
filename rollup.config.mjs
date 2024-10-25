import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import polyfillNode from 'rollup-plugin-polyfill-node';

export default [{
  input: 'dist/index.js',
  output: {
    name: "DictionaryScraper",
    file: "dist/dictionary-scraper.min.js",
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    polyfillNode(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    terser(),
  ],
}];
