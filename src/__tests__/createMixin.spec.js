import { createLocalVue, mount } from '@vue/test-utils';
import createMixin from '../createMixin';

it('should be function', () => {
  expect(createMixin).toEqual(expect.any(Function));
});

it('should return object with vue component hooks', () => {
  expect(createMixin()).toMatchObject({
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
    Vue.mixin(createMixin(GlobalEmitter));
    preparedMount = (comp = {}, options = {}) => (
      mount({ render: () => null, ...comp }, { localVue: Vue, ...options })
    );
  });

  it('should register mixin on the vue instance with no errors', () => {
    expect(preparedMount).not.toThrow();
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

  it('should add dynamic socket listener)', () => {
    const connect = jest.fn();
    const wrapper = preparedMount();
    wrapper.vm.$options.sockets.connect = connect;
    expect(GlobalEmitter.addListener).toHaveBeenCalledTimes(1);
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

  it('should remove socket listeners when callback prop removed from the instance', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    delete wrapper.vm.$options.sockets.connect;
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(1);
  });

  it('should remove dynamic socket listener on component destroy', () => {
    const connect = jest.fn();
    const wrapper = preparedMount();
    wrapper.vm.$options.sockets.connect = connect;
    wrapper.destroy();
    expect(GlobalEmitter.removeListener).toHaveBeenCalledTimes(1);
    expect(GlobalEmitter.removeListener).toHaveBeenCalledWith('connect', connect, wrapper.vm);
  });

  it('should not remove socket listener if component was not destroyed', () => {
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

  it('should keep socket props after removing listeners', () => {
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

describe('no Proxy API available', () => {
  let GlobalEmitter;
  let preparedMount;
  let windowProxySpy;
  beforeEach(() => {
    // TODO: better approach to disable Proxy API is needed
    windowProxySpy = jest.spyOn(window, 'Proxy').mockImplementation(() => undefined);
    GlobalEmitter = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      emit: jest.fn(),
    };
    const Vue = createLocalVue();
    Vue.mixin(createMixin(GlobalEmitter));
    preparedMount = (comp = {}, options = {}) => (
      mount({ render: () => null, ...comp }, { localVue: Vue, ...options })
    );
  });
  afterEach(() => {
    windowProxySpy.mockRestore();
  });

  it('should add socket listener based on instance methods defined by `socket` section', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    expect(GlobalEmitter.addListener).toHaveBeenCalledWith('connect', connect, wrapper.vm);
  });

  // TODO: better approach to disable Proxy API is needed
  it.skip('should remove socket listeners on component destroy', () => {
    const connect = jest.fn();
    const wrapper = preparedMount({
      sockets: {
        connect,
      },
    });
    wrapper.destroy();
    expect(GlobalEmitter.removeListener).toHaveBeenCalledWith('connect', connect, wrapper.vm);
  });

  it('should not remove dynamic socket listener on component destroy', () => {
    const connect = jest.fn();
    const wrapper = preparedMount();
    wrapper.vm.$options.sockets.connect = connect;
    wrapper.destroy();
    expect(GlobalEmitter.removeListener).not.toHaveBeenCalled();
  });

  it('should not add dynamic socket listeners', () => {
    const connect = jest.fn();
    const wrapper = preparedMount();
    wrapper.vm.$options.sockets.connect = connect;
    expect(GlobalEmitter.addListener).not.toHaveBeenCalled();
  });
});
