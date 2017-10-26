import html from 'rollup-plugin-fill-html';
// import image from 'rollup-plugin-img';
import image from '../src/index';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle-[hash].js',
    format: 'iife',
  },
  plugins: [
    image({
      hash: true,
      output: 'dist/images',
      _slash: true
    }),
    html({
      template: 'src/index.html',
      filename: 'index.html',
    })
  ]
};
