import { PluginFunction } from 'vue';
import * as SocketIOClient from 'socket.io-client';
import { VueDecorator } from 'vue-class-component';
// augment typings of Vue.js
import "./vue"

export interface SocketToVuexOptions {
  actionPrefix?: string;
  mutationPrefix?: string;
  eventToMutationTransformer?: (eventName: string) => string;
  eventToActionTransformer?: (eventName: string) => string;
  eventMapping? : (eventMapping : string, socketPauload : any) => string
}

export interface VueSocketIOExtOptions extends SocketToVuexOptions{
  socket: SocketIOClient.Socket;
}

declare class VueSocketIOExt {
  static install: PluginFunction<VueSocketIOExtOptions>;
  static defaults: SocketToVuexOptions;
}

export default VueSocketIOExt
export const Socket: (eventName?: string) => VueDecorator;
