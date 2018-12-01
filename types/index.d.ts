import { PluginFunction } from 'vue';
import * as SocketIOClient from 'socket.io-client';
// augment typings of Vue.js
import "./vue"

export interface SocketToVuexOptions {
  actionPrefix?: string;
  mutationPrefix?: string;
  eventToMutationTransformer?: (eventName: string) => string;
  eventToActionTransformer?: (eventName: string) => string;
}

export interface VueSocketIoExtOptions extends SocketToVuexOptions{
  socket: SocketIOClient.Socket;
}

declare class VueSocketIoExt {
  static install: PluginFunction<VueSocketIoExtOptions>;
  static defaults: SocketToVuexOptions
}

export default VueSocketIoExt
