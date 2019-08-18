// eslint-disable-next-line import/no-extraneous-dependencies
import camelcase from 'camelcase';

export default Object.freeze({
  actionPrefix: 'socket_',
  mutationPrefix: 'SOCKET_',
  eventToMutationTransformer: (event) => event.toUpperCase(),
  eventToActionTransformer: camelcase,
});
