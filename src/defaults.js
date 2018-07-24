import camelcase from 'camelcase';

export default {
  actionPrefix: 'socket_',
  mutationPrefix: 'SOCKET_',
  eventToMutationTransformer: event => event.toUpperCase(),
  eventToActionTransformer: camelcase,
};
