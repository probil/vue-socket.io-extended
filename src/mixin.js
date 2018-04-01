export default GlobalEmitter => ({
  created() {
    const { sockets } = this.$options;

    this.$options.sockets = new Proxy({}, {
      set: (target, key, value) => {
        GlobalEmitter.addListener(key, value, this);
        target[key] = value;
        return true;
      },
      deleteProperty: (target, key) => {
        GlobalEmitter.removeListener(key, this.$options.sockets[key], this);
        delete target.key;
        return true;
      },
    });

    if (sockets) {
      Object.keys(sockets).forEach((key) => {
        this.$options.sockets[key] = sockets[key];
      });
    }
  },
  beforeDestroy() {
    const { sockets } = this.$options;

    if (sockets) {
      Object.keys(sockets).forEach((key) => {
        delete this.$options.sockets[key];
      });
    }
  },
});
