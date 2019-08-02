import { hasProxy } from './utils/env';

export default GlobalEmitter => ({
  created() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.addListener(key, sockets[key], this);
    });

    if (!hasProxy) return;
    this.$options.sockets = new Proxy(sockets, {
      set: (target, key, value) => {
        GlobalEmitter.addListener(key, value, this);
        // eslint-disable-next-line no-param-reassign
        target[key] = value;
        return true;
      },
      deleteProperty: (target, key) => {
        GlobalEmitter.removeListener(key, target[key], this);
        return true;
      },
    });
  },
  beforeDestroy() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      if (!hasProxy) {
        GlobalEmitter.removeListener(key, sockets[key], this);
      } else {
        delete this.$options.sockets[key];
      }
    });
  },
});
