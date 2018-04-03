import { createLocalVue, mount } from '@vue/test-utils';
import Main from '../Main';

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

  it('should throw an error when no connection passed', () => {
    expect(() => Vue.use(Main))
      .toThrowError('[vue-socket.io-ext] cannot locate connection');
  });

  it('should not throw an error when connection passed', () => {
    expect(() => Vue.use(Main, 'ws://localhost'))
      .not.toThrowError('[vue-socket.io-ext] cannot locate connection');
  });

  it('defines socket.io instance as `$socket` on Vue prototype', () => {
    Vue.use(Main, 'http://localhost');
    const wrapper = mount({ render: () => null }, { localVue: Vue });
    expect(wrapper.vm.$socket).toBeDefined();
    expect(wrapper.vm.$socket).toEqual(expect.any(Object));
    expect(wrapper.vm.$socket.on).toEqual(expect.any(Function));
    expect(wrapper.vm.$socket.emit).toEqual(expect.any(Function));
  });

  it('registers mixin on Vue', () => {
    const spy = jest.spyOn(Vue, 'mixin');
    Vue.use(Main, 'http://localhost');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.any(Object));
  });
});
