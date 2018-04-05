import { createLocalVue, mount } from '@vue/test-utils';
import Main from '../Main';
import io from '../__mocks__/socket.io-client';

it('should be vue plugin (is an object with `install` method)', () => {
  expect(Main).toMatchObject({
    install: expect.any(Function),
  });
});

describe('.install()', () => {
  let Vue;
  beforeEach(() => {
    Vue = createLocalVue();
  });

  it('should accept 3 arguments', () => {
    expect(Main.install).toHaveProperty('length', 3);
  });

  it('should throw an error when no second argument passed', () => {
    expect(() => Vue.use(Main))
      .toThrowErrorMatchingSnapshot();
  });

  it('should throw an error when second argument is not socket.io instance', () => {
    expect(() => Vue.use(Main, { a: 1 }))
      .toThrowErrorMatchingSnapshot();
    expect(() => Vue.use(Main, 'ws://localhost'))
      .toThrowErrorMatchingSnapshot();
  });

  it('should not throw an error when second argument is socket.io instance', () => {
    const socket = io('ws://localhost');
    expect(() => Vue.use(Main, socket))
      .not
      .toThrowError();
  });

  it('defines socket.io instance as `$socket` on Vue prototype', () => {
    Vue.use(Main, io('ws://localhost'));
    const wrapper = mount({ render: () => null }, { localVue: Vue });
    expect(wrapper.vm.$socket).toBeDefined();
    expect(wrapper.vm.$socket).toEqual(expect.any(Object));
    expect(wrapper.vm.$socket.on).toEqual(expect.any(Function));
    expect(wrapper.vm.$socket.emit).toEqual(expect.any(Function));
  });

  it('registers mixin on Vue', () => {
    const spy = jest.spyOn(Vue, 'mixin');
    Vue.use(Main, io('ws://localhost'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(Object));
  });
});
