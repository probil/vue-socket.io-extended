const SYSTEM_EVENTS = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'connect_error', 'connect_timeout', 'connecting', 'ping', 'pong'];

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
    emit: jest.fn(),

    // helpers
    fireServerEvent(label, ...args) {
      if (SYSTEM_EVENTS.includes(label)) return;
      this.onevent({ data: [label, ...args] });
    },

    fireSystemEvent(label, ...args) {
      if (!SYSTEM_EVENTS.includes(label)) return;
      (handlers[label] || []).forEach(cb => cb(label, ...args));
    },
    getHandlers: () => handlers,
  };
};
