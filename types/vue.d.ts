/**
 * Extends interfaces in Vue.js
 */

import _Vue from 'vue';
import * as SocketIOClient from 'socket.io-client';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends _Vue> {
    sockets?: {
      [keys: string]: Function,
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $socket: SocketIOClient.Socket;
  }
}
