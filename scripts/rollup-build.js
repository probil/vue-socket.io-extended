/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser'; // uglifyjs alternative
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(),
      terser(),
      filesize(),
    ],
    output: {
      format: 'esm',
      file: 'dist/vue-socket.io-ext.esm.js',
    },
  },
  {
    input: 'src/index.js',
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(),
      terser(),
      filesize(),
    ],
    output: {
      format: 'umd',
      name: 'VueSocketIOExt',
      exports: 'named',
      globals: { vue: 'Vue' },
      file: 'dist/vue-socket.io-ext.min.js',
    },
  },
  {
    input: 'src/decorator.js',
    external: ['vue-class-component'],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(),
      terser(),
      filesize(),
    ],
    output: {
      format: 'esm',
      file: 'dist/vue-socket.io-ext.decorator.esm.js',
    },
  },
];
