export default GlobalEmitter => ({
  created() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.addListener(key, sockets[key], this);
    });

    if (!window.Proxy) return;
    this.$options.sockets = new Proxy(sockets, {
      set: (target, key, value) => {
        GlobalEmitter.addListener(key, value, this);
        // eslint-disable-next-line no-param-reassign
        target[key] = value;
        return true;
      },
      deleteProperty: (target, key) => {
        GlobalEmitter.removeListener(key, this.$options.sockets[key], this);
        // eslint-disable-next-line no-param-reassign
        delete target.key;
        return true;
      },
    });
  },
  beforeDestroy() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      if (!window.Proxy) {
        GlobalEmitter.removeListener(key, sockets[key], this);
      }
      delete this.$options.sockets[key];
    });
  },
});
