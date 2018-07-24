import camelcase from 'camelcase';

export default Object.freeze({
  actionPrefix: 'socket_',
  mutationPrefix: 'SOCKET_',
  eventToMutationTransformer: event => event.toUpperCase(),
  eventToActionTransformer: camelcase,
});
