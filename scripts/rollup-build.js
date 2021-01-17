/* eslint-disable import/no-extraneous-dependencies */
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'src/index.esm.js',
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(),
      terser(), // uglifyjs alternative
      filesize(),
    ],
    output: {
      format: 'esm',
      file: 'dist/vue-socket.io-ext.esm.js',
    },
  },
  {
    input: 'src/index.umd.js',
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel(),
      terser(), // uglifyjs alternative
      filesize(),
    ],
    output:
      {
        format: 'umd',
        name: 'VueSocketIOExt',
        exports: 'named',
        file: 'dist/vue-socket.io-ext.min.js',
      },
  },
];
