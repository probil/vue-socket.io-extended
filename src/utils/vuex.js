export const getRegisteredMutations = store => (
  // eslint-disable-next-line no-underscore-dangle
  Object.keys(store._mutations)
);

export const getRegisteredActions = store => (
  // eslint-disable-next-line no-underscore-dangle
  Object.keys(store._actions)
);

export const trimNamespace = namespaced => (
  namespaced.split('/').pop()
);
