import Vuex, { Store } from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import io from '../__mocks__/socket.io-client';
import Observe from '../Observe';

createLocalVue().use(Vuex);

const vuexActionCbInterface = expect.objectContaining({
  commit: expect.any(Function),
  dispatch: expect.any(Function),
});

it('should be a function', () => {
  expect(Observe).toEqual(expect.any(Function));
});

it('should register system event handlers', () => {
  const socket = io('wss://localhost');
  Observe(socket);
  expect(socket.getHandlers()).toMatchObject({
    connect: [expect.any(Function)],
    connect_error: [expect.any(Function)],
    connect_timeout: [expect.any(Function)],
    connecting: [expect.any(Function)],
    disconnect: [expect.any(Function)],
    error: [expect.any(Function)],
    ping: [expect.any(Function)],
    pong: [expect.any(Function)],
    reconnect: [expect.any(Function)],
    reconnect_attempt: [expect.any(Function)],
    reconnect_error: [expect.any(Function)],
    reconnect_failed: [expect.any(Function)],
    reconnecting: [expect.any(Function)],
  });
});

it('should invoke mutation on store when system event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      SOCKET_CONNECT: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireSystemEvent('connect');
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenCalledTimes(1);
});

it('should invoke mutation on store when system event is fired (with arguments)', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      SOCKET_CONNECT: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireSystemEvent('connect', { isConnected: true });
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(store.state, { isConnected: true });
});

it('should invoke mutation on store when server event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      SOCKET_MESSAGE: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireServerEvent('message');
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenCalledTimes(1);
});

it('should invoke mutation on store when server event is fired (with arguments)', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      SOCKET_MESSAGE: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(store.state, expect.objectContaining(message));
});

it('should invoke action on store when system event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_connect: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireSystemEvent('connect', { isConnected: true });
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(
    vuexActionCbInterface,
    { isConnected: true },
  );
});

it('should invoke action on store when system event is fired (with arguments)', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_connect: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireSystemEvent('connect', { isConnected: true });
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(
    vuexActionCbInterface,
    { isConnected: true },
  );
});

it('should invoke action on store when server event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_message: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  socket.fireServerEvent('message');
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(
    vuexActionCbInterface,
    undefined,
  );
});

it('should invoke action on store when server event is fired (with arguments)', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_message: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, { store });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(
    vuexActionCbInterface,
    message,
  );
});

it('should apply custom event to action transformer', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_MESSAGE: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, {
    store,
    eventToActionTransformer: (event) => event.toUpperCase(),
  });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(
    vuexActionCbInterface,
    message,
  );
});

it('should apply custom event to mutation transformer', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      'SOCKET_new message': fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, {
    store,
    eventToMutationTransformer: (event) => event,
  });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('new message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(store.state, expect.objectContaining(message));
});

it('should apply custom event name mapping', () => {
  const fn = jest.fn();
  const socket = io('wss://localhost');
  Observe(socket, {
    eventMapping: fn,
  });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('new message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith('new message', [message]);
});

it('should apply custom action prefix', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      'socket|newMessage': fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, {
    store,
    actionPrefix: 'socket|',
  });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('new message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(
    vuexActionCbInterface,
    message,
  );
});

it('should apply custom mutation prefix', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      __TEST__MESSAGE: fn,
    },
  });
  const socket = io('wss://localhost');
  Observe(socket, {
    store,
    mutationPrefix: '__TEST__',
  });
  const message = { id: 15, body: 'Hi there' };
  socket.fireServerEvent('message', message);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenLastCalledWith(store.state, expect.objectContaining(message));
});
