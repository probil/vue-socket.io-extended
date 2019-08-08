/**
 * @param {EventEmitter} GlobalEmitter
 * @return {Object}
 */
export default GlobalEmitter => ({
  created() {
    this.$options.sockets = this.$options.sockets || {};
    const { sockets } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.addListener(key, sockets[key], this);
    });

    Object.defineProperties(this.$options.sockets, {
      $subscribe: {
        value: (key, fn) => GlobalEmitter.addListener(key, fn, this),
        writable: false,
        enumerable: false,
        configurable: true,
      },
      $unsubscribe: {
        value: key => GlobalEmitter.removeListener(key, this),
        writable: false,
        enumerable: false,
        configurable: true,
      },
    });
  },
  beforeDestroy() {
    const { sockets = {} } = this.$options;

    Object.keys(sockets).forEach((key) => {
      GlobalEmitter.removeListener(key, this);
    });
  },
  destroyed() {
    delete this.$options.sockets.$subscribe;
    delete this.$options.sockets.$unsubscribe;
  },
});
