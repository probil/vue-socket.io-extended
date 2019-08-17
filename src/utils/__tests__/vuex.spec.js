import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { getRegisteredActions, getRegisteredMutations, trimNamespace } from '../vuex';

const Vue = createLocalVue();
Vue.use(Vuex);

const noop = () => undefined;

describe('.getRegisteredActions()', () => {
  it('is a function', () => {
    expect(getRegisteredActions).toEqual(expect.any(Function));
  });
  it('returns empty array if no actions registered', () => {
    const store = new Store({});
    expect(getRegisteredActions(store)).toEqual([]);
  });
  it('returns array of actions', () => {
    const store = new Store({
      actions: {
        thisAction: noop,
        oneMore: noop,
      },
    });
    expect(getRegisteredActions(store)).toEqual(['thisAction', 'oneMore']);
  });
  it('returns array of actions including namespaced modules', () => {
    const test = {
      namespaced: true,
      actions: {
        oneMore: noop,
        connect: noop,
      },
    };
    const router = {
      namespaced: true,
      actions: {
        navigate: noop,
      },
    };
    const store = new Store({
      actions: {
        thisAction: noop,
      },
      modules: { test, router },
    });
    expect(getRegisteredActions(store)).toEqual([
      'thisAction',
      'test/oneMore',
      'test/connect',
      'router/navigate',
    ]);
  });
  it('do not return mutations', () => {
    const store = new Store({
      mutations: {
        testMutation: noop,
      },
      actions: {
        testAction: noop,
      },
    });
    expect(getRegisteredActions(store)).not.toContain('testMutation');
  });
});

describe('.getRegisteredMutations()', () => {
  it('is a function', () => {
    expect(getRegisteredMutations).toEqual(expect.any(Function));
  });
  it('returns empty array if no mutations registered', () => {
    const store = new Store({});
    expect(getRegisteredActions(store)).toEqual([]);
  });
  it('returns array of mutations', () => {
    const store = new Store({
      mutations: {
        thisMutation: noop,
        oneMore: noop,
      },
    });
    expect(getRegisteredMutations(store)).toEqual(['thisMutation', 'oneMore']);
  });
  it('returns array of mutations including namespaced modules', () => {
    const test = {
      namespaced: true,
      mutations: {
        oneMore: noop,
        connect: noop,
      },
    };
    const router = {
      namespaced: true,
      mutations: {
        navigate: noop,
      },
    };
    const store = new Store({
      mutations: {
        thisMutation: noop,
      },
      modules: { test, router },
    });
    expect(getRegisteredMutations(store)).toEqual([
      'thisMutation',
      'test/oneMore',
      'test/connect',
      'router/navigate',
    ]);
  });
  it('do not return actions', () => {
    const store = new Store({
      mutations: {
        testMutation: noop,
      },
      actions: {
        testAction: noop,
      },
    });
    expect(getRegisteredMutations(store)).not.toContain('testAction');
  });
});

describe('.trimNamespace()', () => {
  it('is a function', () => {
    expect(trimNamespace).toEqual(expect.any(Function));
  });
  it('returns common string "as-is"', () => {
    ['', 'test', 'super action', 'SOCKET_CONNECT', 'test\\action', 'change|user']
      .forEach((str) => (
        expect(trimNamespace(str)).toBe(str)
      ));
  });
  it('trims namespaces from given string', () => {
    expect(trimNamespace('socket/connect')).toBe('connect');
    expect(trimNamespace('MODULE/TEST')).toBe('TEST');
    expect(trimNamespace('MODULE/TEST\\TEST')).toBe('TEST\\TEST');
  });
  it('trims deeps namespace namespaces from given string', () => {
    expect(trimNamespace('super/deep/socket/connect')).toBe('connect');
    expect(trimNamespace('a/b/c/d/E/f/G/K/L/M/N')).toBe('N');
    expect(trimNamespace('/////D')).toBe('D');
  });
});
