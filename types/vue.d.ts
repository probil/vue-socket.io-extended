/**
 * Extends interfaces in Vue.js
 */

import Vue, { ComponentOptions } from "vue";
import * as SocketIOClient from 'socket.io-client';

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    sockets?: {
      [keys: string]: Function,
    }
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $socket: SocketIOClient.Socket;
  }
}
