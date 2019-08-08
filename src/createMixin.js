/**
 * @param {EventEmitter} GlobalEmitter
 * @return {Object}
 */
export default GlobalEmitter => ({
  created() {
    this.$options.sockets = this.$options.sockets || {};
    const { sockets } = this.$options;
    const addListener = GlobalEmitter.addListener.bind(null, this);
    const removeListenersByLabel = GlobalEmitter.removeListenersByLabel.bind(null, this);

    Object.keys(sockets).forEach((key) => {
      addListener(key, sockets[key]);
    });

    Object.defineProperties(this.$options.sockets, {
      $subscribe: {
        value: addListener,
        writable: false,
        enumerable: false,
        configurable: true,
      },
      $unsubscribe: {
        value: removeListenersByLabel,
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
