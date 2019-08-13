/**
 * Extends interfaces in Vue.js
 */

import _Vue from 'vue';
import * as SocketIOClient from 'socket.io-client';

type DefaultSocketHandlers<V> =  {
  [key: string]: (this: V, ...args: any[]) => any
};

declare module 'vue/types/options' {
  interface ComponentOptions<V extends _Vue> {
    sockets?: DefaultSocketHandlers<V>
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $socket: {
      client: SocketIOClient.Socket;
      $subscribe: (event: string, fn: Function) => void;
      $unsubscribe: (event: string) => void;
      connected: boolean;
      disconnected: boolean;
    };
  }
}
