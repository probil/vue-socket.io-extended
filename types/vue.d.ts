/**
 * Extends interfaces in Vue.js
 */

import { App } from "vue";
import * as SocketIOClient from 'socket.io-client';

type DefaultSocketHandlers = {
  [key: string]: (...args: any[]) => any
};

import { ComponentCustomOptions } from 'vue';
import { ComponentCustomProperties } from 'vue';
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    sockets?: DefaultSocketHandlers;
  }
  interface ComponentCustomProperties {
    $socket: {
      client: SocketIOClient.Socket;
      $subscribe: (event: string, fn: Function) => void;
      $unsubscribe: (event: string) => void;
      connected: boolean;
      disconnected: boolean;
    };
  }
}
