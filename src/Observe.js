import GlobalEmitter from './GlobalEmitter';
import { unwrapIfSingle, prefixWith, pipe } from './utils';
import { getRegisteredMutations, getRegisteredActions, trimNamespace } from './utils/vuex';
import defaults from './defaults';

const SYSTEM_EVENTS = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'connect_error', 'connect_timeout', 'connecting', 'ping', 'pong'];

export default (Socket, { store, ...otherOptions } = {}) => {
  const options = { ...defaults, ...otherOptions };

  function passToStore(event, payload) {
    if (!store) return;

    const unwrappedPayload = unwrapIfSingle(payload);
    const eventToAction = pipe(
      options.eventToActionTransformer,
      prefixWith(options.actionPrefix),
    );
    const eventToMutation = pipe(
      options.eventToMutationTransformer,
      prefixWith(options.mutationPrefix),
    );

    const desiredMutation = eventToMutation(event);
    const desiredAction = eventToAction(event);

    const mutations = getRegisteredMutations(store);
    const actions = getRegisteredActions(store);

    mutations
      .filter(namespacedMutation => trimNamespace(namespacedMutation) === desiredMutation)
      .forEach(namespacedMutation => store.commit(namespacedMutation, unwrappedPayload));

    actions
      .filter(namespacedAction => trimNamespace(namespacedAction) === desiredAction)
      .forEach(namespacedAction => store.dispatch(namespacedAction, unwrappedPayload));
  }

  function registerEventHandler() {
    const superOnEvent = Socket.onevent;
    // eslint-disable-next-line no-param-reassign
    Socket.onevent = (packet) => {
      superOnEvent.call(Socket, packet);

      GlobalEmitter.emit(...packet.data);

      const [eventName, ...args] = packet.data;
      passToStore(eventName, [...args]);
    };

    SYSTEM_EVENTS.forEach((eventName) => {
      Socket.on(eventName, (...args) => {
        GlobalEmitter.emit(eventName, ...args);
        passToStore(eventName, [...args]);
      });
    });
  }

  registerEventHandler();
};
