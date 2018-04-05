import Vuex, { Store } from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import io from '../__mocks__/socket.io-client';
import Observer from '../Observer';

createLocalVue().use(Vuex);

it('should be a class', () => {
  expect(Observer).toEqual(expect.any(Function));
});

it('should allow to create new instance with `new`', () => {
  expect(new Observer(io('wss://localhost'))).toBeInstanceOf(Observer);
});

it('should save store on the instance if passed', () => {
  const store = jest.fn();
  const observer = new Observer(io('wss://localhost'), store);
  expect(observer.store).toBe(store);
});

it('should not save store on the instance if not passed', () => {
  const observer = new Observer(io('wss://localhost'));
  expect(observer.store).toBeUndefined();
});

it('should use given instance of the socket if passed', () => {
  const socket = io('wss://localhost');
  const observer = new Observer(socket);
  expect(observer.Socket).toBe(socket);
});

it('should register system event handlers', () => {
  const observer = new Observer(io('wss://localhost'));
  expect(observer.Socket.getHandlers()).toMatchObject({
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
  const observer = new Observer(io('wss://localhost'), store);
  observer.Socket.fireSystemEvent('connect');
  expect(fn).toHaveBeenCalled();
});

it('should invoke mutation on store when server event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    mutations: {
      SOCKET_MESSAGE: fn,
    },
  });
  const observer = new Observer(io('wss://localhost'), store);
  observer.Socket.fireServerEvent('message', { id: 15, body: 'Hi there' });
  expect(fn).toHaveBeenCalled();
});

it('should invoke action on store when system event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_connect: fn,
    },
  });
  const observer = new Observer(io('wss://localhost'), store);
  observer.Socket.fireSystemEvent('connect');
  expect(fn).toHaveBeenCalled();
});

it('should invoke action on store when server event is fired', () => {
  const fn = jest.fn();
  const store = new Store({
    actions: {
      socket_message: fn,
    },
  });
  const observer = new Observer(io('wss://localhost'), store);
  observer.Socket.fireServerEvent('message');
  expect(fn).toHaveBeenCalled();
});
