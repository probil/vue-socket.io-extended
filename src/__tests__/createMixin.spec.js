import { createLocalVue, mount } from '@vue/test-utils';
import createMixin from '../createMixin';

const setup = () => {
  const GlobalEmitter = {
    addListener: jest.fn(),
    removeListenersByLabel: jest.fn(),
    emit: jest.fn(),
  };
  const Vue = createLocalVue();
  Vue.mixin(createMixin(GlobalEmitter));
  const preparedMount = (comp = {}, options = {}) => (
    mount({ render: () => null, ...comp }, { localVue: Vue, ...options })
  );
  return { preparedMount, GlobalEmitter };
};

it('should be function', () => {
  expect(createMixin).toEqual(expect.any(Function));
});

it('should return object with vue component hooks', () => {
  expect(createMixin()).toMatchObject({
    created: expect.any(Function),
    beforeDestroy: expect.any(Function),
    destroyed: expect.any(Function),
  });
});

describe('mixin use on component', () => {
  it('registers mixin on the vue instance with no errors', () => {
    const { preparedMount } = setup();
    expect(preparedMount).not.toThrow();
  });

  it('adds socket listener based on instance methods defined by `socket` section', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledTimes(1);
  });

  it('adds multiple socket listeners based on instance methods defined by `socket` section', () => {
    const { GlobalEmitter, preparedMount } = setup();
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

  it('adds socket listener with correct params based on instance methods defined by `socket` section', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledWith(wrapper.vm, 'connect', connect);
  });

  it('removes socket listeners on component destroy', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    wrapper.destroy();
    expect(GlobalEmitter.removeListenersByLabel).toHaveBeenCalledTimes(1);
  });

  it('should not remove socket listener if component was not destroyed', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.removeListenersByLabel).toHaveBeenCalledTimes(0);
  });

  it('should not remove socket listeners if component has no sockets defined', () => {
    const { GlobalEmitter, preparedMount } = setup();
    preparedMount();
    expect(GlobalEmitter.removeListenersByLabel).toHaveBeenCalledTimes(0);
  });

  it('should keep socket props after component destroy', () => {
    const { preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    wrapper.destroy();
    expect(wrapper.vm.$options.sockets).toMatchObject({
      connect,
    });
  });
});

describe('dynamic listeners', () => {
  it('allows to subscribe dynamically', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount();
    wrapper.vm.$socket.$subscribe('connect', connect);
    expect(GlobalEmitter.addListener).toHaveBeenCalledTimes(1);
    expect(GlobalEmitter.addListener).toHaveBeenCalledWith(wrapper.vm, 'connect', connect);
  });

  it('allows to unsubscribe dynamically', () => {
    const { GlobalEmitter, preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    wrapper.vm.$socket.$unsubscribe('connect', connect);
    expect(GlobalEmitter.removeListenersByLabel).toHaveBeenCalledTimes(1);
  });

  it('should not keep socket props after removing dynamic listeners', () => {
    const { preparedMount } = setup();
    const connect = jest.fn();
    const wrapper = preparedMount({
      created() {
        this.$socket.$subscribe('connect', connect);
      },
      beforeDestroy() {
        this.$socket.$unsubscribe('connect');
      },
    });
    wrapper.destroy();
    expect(wrapper.vm.$options.sockets).not.toHaveProperty('connect');
  });

  it('adds $subscribe and $unsubscribe helpers to the instance after creation', () => {
    const { preparedMount } = setup();
    const wrapper = preparedMount();
    expect(wrapper.vm.$socket.$subscribe).toEqual(expect.any(Function));
    expect(wrapper.vm.$socket.$unsubscribe).toEqual(expect.any(Function));
  });

  it('removes $subscribe and $unsubscribe helpers from the instance after destroy', () => {
    const { preparedMount } = setup();
    const wrapper = preparedMount();
    wrapper.destroy();
    expect(wrapper.vm.$socket.$unsubscribe).toBeUndefined();
    expect(wrapper.vm.$socket.$subscribe).toBeUndefined();
  });
});
