import Socket from 'socket.io-client';
import GlobalEmitter from './GlobalEmitter';

export default class Observer {
  constructor(connection, store) {
    if (typeof connection === 'string') {
      this.Socket = Socket(connection);
    } else {
      this.Socket = connection;
    }

    if (store) this.store = store;

    this.onEvent();
  }

  onEvent() {
    const super_onevent = this.Socket.onevent;
    this.Socket.onevent = (packet) => {
      super_onevent.call(this.Socket, packet);

      GlobalEmitter.emit(...packet.data);

      if (this.store) this.passToStore(`SOCKET_${packet.data[0]}`, [...packet.data.slice(1)]);
    };

    const _this = this;

    ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'connect_error', 'connect_timeout', 'connecting', 'ping', 'pong']
      .forEach((value) => {
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

      const camelcased = `socket_${
        event.toLowerCase()
          .replace('SOCKET_', '')
          .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase())
      }`;

      if (action === camelcased) this.store.dispatch(namespaced, payload);
    }
  }
}
