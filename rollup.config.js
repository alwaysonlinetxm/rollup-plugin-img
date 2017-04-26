import buble from 'rollup-plugin-buble';
const pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  targets: [
    { format: 'cjs', dest: pkg['main'] },
    { format: 'es', dest: pkg['module'] }
  ],
  external: ['fs', 'path', 'rollup-pluginutils'],
  plugins: [
    buble()
  ]
};
