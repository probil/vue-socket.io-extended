export default (params) => {
  const onevent = jest.fn();
  const handlers = {};
  return {
    params,
    onevent,
    // original even callback
    _onevent: onevent,
    on: (label, cb) => {
      handlers[label] = [...(handlers[label] || []), cb];
    },

    // helpers
    fireEventFromServer(label, ...args) {
      this.onevent({ data: [label, ...args] });
      (handlers[label] || []).forEach(cb => cb(label, ...args));
    },
    getHandlers: () => handlers,
  };
};
