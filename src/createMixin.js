/**
 * @param {EventEmitter} GlobalEmitter
 * @return {Object}
 */
export default GlobalEmitter => ({
  created() {
    this.$options.sockets = this.$options.sockets || {};
    const { sockets } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.addListener(this, key, sockets[key]);
    });

    Object.defineProperties(this.$options.sockets, {
      $subscribe: {
        value: (key, fn) => GlobalEmitter.addListener(this, key, fn),
        writable: false,
        enumerable: false,
        configurable: true,
      },
      $unsubscribe: {
        value: key => GlobalEmitter.removeListenersByLabel(this, key),
        writable: false,
        enumerable: false,
        configurable: true,
      },
    });
  },
  beforeDestroy() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.removeListenersByLabel(this, key);
    });
  },
  destroyed() {
    delete this.$options.sockets.$subscribe;
    delete this.$options.sockets.$unsubscribe;
  },
});
