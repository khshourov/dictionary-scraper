import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [{
  input: 'dist/index.js',
  output: {
    name: "DictionaryScrapper",
    file: "dist/dictionary-scrapper.min.js",
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
  ],
}];
