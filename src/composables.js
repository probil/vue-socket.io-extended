// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, onBeforeMount, onBeforeUnmount } from 'vue';

const SocketExtensionKey = Symbol('$socket');

const useSocket = () => inject(SocketExtensionKey);

function onSocketEvent(event, callback) {
  const socket = useSocket();
  onBeforeMount(() => socket.$subscribe(event, callback));
  onBeforeUnmount(() => socket.$unsubscribe(event));
}

export { SocketExtensionKey, useSocket, onSocketEvent };
