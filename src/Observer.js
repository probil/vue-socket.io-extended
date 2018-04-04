import Socket from 'socket.io-client';
import GlobalEmitter from './GlobalEmitter';
import { eventToAction } from './utils';

const SYSTEM_EVENTS = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'connect_error', 'connect_timeout', 'connecting', 'ping', 'pong'];

export default class Observer {
  constructor(connection, store) {
    if (typeof connection === 'string') {
      this.Socket = Socket(connection);
    } else {
      this.Socket = connection;
    }

    if (store) this.store = store;

    this.registerEventHandler();
  }

  registerEventHandler() {
    const superOnEvent = this.Socket.onevent;
    this.Socket.onevent = (packet) => {
      superOnEvent.call(this.Socket, packet);

      GlobalEmitter.emit(...packet.data);

      if (this.store) this.passToStore(`SOCKET_${packet.data[0]}`, [...packet.data.slice(1)]);
    };

    const _this = this;


    SYSTEM_EVENTS.forEach((value) => {
      _this.Socket.on(value, (data) => {
        GlobalEmitter.emit(value, data);
        if (_this.store) _this.passToStore(`SOCKET_${value}`, data);
      });
    });
  }


  passToStore(event, payload) {
    if (!event.startsWith('SOCKET_')) return;

    for (const namespaced in this.store._mutations) {
      const mutation = namespaced.split('/').pop();
      if (mutation === event.toUpperCase()) this.store.commit(namespaced, payload);
    }

    for (const namespaced in this.store._actions) {
      const action = namespaced.split('/').pop();

      if (!action.startsWith('socket_')) continue;

      const camelcased = eventToAction(event);

      if (action === camelcased) this.store.dispatch(namespaced, payload);
    }
  }
}
