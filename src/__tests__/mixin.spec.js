import { createLocalVue, mount } from '@vue/test-utils';
import mixin from '../mixin';

it('should be function', () => {
  expect(mixin).toEqual(expect.any(Function));
});

it('should return object with vue component hooks', () => {
  expect(mixin()).toMatchObject({
    created: expect.any(Function),
    beforeDestroy: expect.any(Function),
  });
});

describe('mixin use on component', () => {
  let GlobalEmitter;
  let preparedMount;
  beforeEach(() => {
    GlobalEmitter = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      emit: jest.fn(),
    };
    const Vue = createLocalVue();
    Vue.mixin(mixin(GlobalEmitter));
    preparedMount = (comp = {}, options = {}) => (
      mount({ render: () => null, ...comp }, { localVue: Vue, ...options })
    );
  });

  it('should register mixin on the vue instance with no errors', () => {
    expect(preparedMount).not.toThrowError();
  });

  it('should add socket listener based on instance methods defined by `socket` section', () => {
    const connect = jest.fn();
    preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledTimes(1);
  });

  it('should add multiple socket listeners based on instance methods defined by `socket` section', () => {
    const connect = jest.fn();
    const message = jest.fn();
    const disconnect = jest.fn();
    preparedMount({
      sockets: {
        connect,
        message,
        disconnect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledTimes(3);
  });

  it('should add socket listener with correct params based on instance methods defined by `socket` section', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledWith('connect', connect, wrapper.vm);
  });

  it('should remove socket listeners on component destroy', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    wrapper.destroy();
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(1);
  });

  it('should remove socket listeners when callback prop when removed from the instance', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    delete wrapper.vm.$options.sockets.connect;
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(1);
  });

  it('should not remove socket listeners if component was not destroyed', () => {
    const connect = jest.fn();
    preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(0);
  });

  it('should not remove socket listeners if component has no sockets defined', () => {
    preparedMount();
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(0);
  });

  it('should not remove socket listeners on destroy if `sockets` options was removed from the instance', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    delete wrapper.vm.$options.sockets;
    wrapper.destroy();
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(0);
  });
});
