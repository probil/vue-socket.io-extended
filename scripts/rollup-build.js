/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      plugins: ['external-helpers'],
    }),
    terser(), // uglifyjs alternative
    filesize(),
  ],
  output: [
    {
      format: 'es',
      file: 'dist/vue-socket.io-ext.esm.js',
    },
    {
      format: 'umd',
      name: 'VueSocketIOExt',
      exports: 'default',
      file: 'dist/vue-socket.io-ext.min.js',
    },
  ],
};
