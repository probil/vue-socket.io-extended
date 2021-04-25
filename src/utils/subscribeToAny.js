import { augmentMethod, isFunction } from './index';

const subscribeToAnyV2 = (Socket, cb) => {
  augmentMethod(Socket, 'onevent', (packet) => {
    const [eventName, ...args] = packet.data;
    cb(eventName, ...args);
  });
};

const subscribeToAnyV300 = (Socket, cb) => {
  Socket.use(cb);
};

const subscribeToAnyV305 = (Socket, cb) => {
  Socket.onAny(cb);
};

const subscribeToAny = (Socket, cb) => {
  if (isFunction(Socket.onAny)) {
    return subscribeToAnyV305(Socket, cb);
  }
  if (isFunction(Socket.use)) {
    return subscribeToAnyV300(Socket, cb);
  }
  return subscribeToAnyV2(Socket, cb);
};

export default subscribeToAny;
