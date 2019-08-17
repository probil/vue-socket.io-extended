/* eslint no-underscore-dangle: ["error", { "allow": ["_listeners"] }] */
import createEventListener from '../createEventEmitter';

it('should be a factory function', () => {
  expect(createEventListener).toEqual(expect.any(Function));
});

describe('#emit()', () => {
  it('should invoke the callback', () => {
    const spy = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy);
    emitter.emit('foo');
    expect(spy).toHaveBeenCalled();
  });

  it('should pass arguments to the callback', () => {
    const spy = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy);
    emitter.emit('foo', 'bar', 'baz');
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenLastCalledWith('bar', 'baz');
  });

  it('should invoke multiple callbacks', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy1);
    emitter.addListener(vm, 'foo', spy2);
    emitter.emit('foo');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should not invoke the callback', () => {
    const spy = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy);
    emitter.emit('baz');
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('#addListener()', () => {
  it('should register listener', () => {
    const spy = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy);
    expect(emitter._listeners).toEqual(new Map([['foo', [{ callback: spy, vm }]]]));
  });

  it('should register multiple listeners for one label', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy1);
    emitter.addListener(vm, 'foo', spy2);
    expect(emitter._listeners).toEqual(new Map([['foo', [{ callback: spy1, vm }, { callback: spy2, vm }]]]));
  });

  it('should register multiple listeners for different labels', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo', spy1);
    emitter.addListener(vm, 'baz', spy2);
    expect(emitter._listeners).toEqual(new Map([['foo', [{ callback: spy1, vm }]], ['baz', [{ callback: spy2, vm }]]]));
  });

  it('should not register listener if no callback passed', () => {
    const emitter = createEventListener();
    const vm = {};

    emitter.addListener(vm, 'foo');
    expect(emitter._listeners).toEqual(new Map([]));
  });
});

describe('#removeListenersByLabel()', () => {
  it('should remove listener on given context', () => {
    const spy = jest.fn();
    const vm = {};
    const emitter = createEventListener([['foo', [{ callback: spy, vm }]]]);
    emitter.removeListenersByLabel(vm, 'foo');
    expect(emitter._listeners).toEqual(new Map());
  });

  it('should remove listener but keep the same listener on other context', () => {
    const spy = jest.fn();
    const vm = {};
    const vm2 = {};
    const emitter = createEventListener([
      ['foo', [{ callback: spy, vm }]],
      ['foo', [{ callback: spy, vm: vm2 }]],
    ]);
    emitter.removeListenersByLabel(vm, 'foo');
    expect(emitter._listeners).toEqual(new Map([['foo', [{ callback: spy, vm: vm2 }]]]));
  });

  it('should do nothing for empty listener', () => {
    const vm = {};
    const emitter = createEventListener();
    emitter.removeListenersByLabel(vm, 'foo');
    expect(emitter._listeners).toEqual(new Map());
  });
});
