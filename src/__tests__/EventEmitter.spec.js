import EventEmitter from '../EventEmitter';

it('should be a class', () => {
  expect(EventEmitter).toEqual(expect.any(Function));
});

it('should allow to create new instance with `new`', () => {
  expect(new EventEmitter()).toBeInstanceOf(EventEmitter);
});

describe('#emit()', () => {
  it('should invoke the callback', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy);
    emitter.emit('foo');
    expect(spy).toBeCalled();
  });

  it('should pass arguments to the callback', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy);
    emitter.emit('foo', 'bar', 'baz');
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenLastCalledWith('bar', 'baz');
  });

  it('should invoke multiple callbacks', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy1);
    emitter.addListener('foo', spy2);
    emitter.emit('foo');
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });

  it('should not invoke the callback', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy);
    emitter.emit('baz');
    expect(spy).not.toBeCalled();
  });
});

describe('#addListener()', () => {
  it('should register listener', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy);
    expect(emitter.listeners).toEqual(new Map([['foo', [{ callback: spy, vm: undefined }]]]));
  });

  it('should register multiple listeners for one label', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy1);
    emitter.addListener('foo', spy2);
    expect(emitter.listeners).toEqual(new Map([['foo', [{ callback: spy1, vm: undefined }, { callback: spy2, vm: undefined }]]]));
  });

  it('should register multiple listeners for different labels', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const emitter = new EventEmitter();

    emitter.addListener('foo', spy1);
    emitter.addListener('baz', spy2);
    expect(emitter.listeners).toEqual(new Map([['foo', [{ callback: spy1, vm: undefined }]], ['baz', [{ callback: spy2, vm: undefined }]]]));
  });

  it('should not register listener if no callback passed', () => {
    const emitter = new EventEmitter();

    emitter.addListener('foo');
    expect(emitter.listeners).toEqual(new Map([]));
  });
});

describe('#removeListener()', () => {
  it('should remove given listener', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();
    emitter.listeners = new Map([['foo', [{ callback: spy, vm: undefined }]]]);
    emitter.removeListener('foo', spy, undefined);
    expect(emitter.listeners).toEqual(new Map());
  });

  it('should do nothing if it was not registered', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const emitter = new EventEmitter();
    emitter.listeners = new Map([['foo', [{ callback: spy, vm: undefined }]]]);
    emitter.removeListener('foo', spy2, undefined);
    expect(emitter.listeners).toEqual(new Map([['foo', [{ callback: spy, vm: undefined }]]]));
  });

  it('should do nothing for empty listener', () => {
    const spy = jest.fn();
    const emitter = new EventEmitter();
    emitter.removeListener('foo', spy, undefined);
    expect(emitter.listeners).toEqual(new Map());
  });

  it('should do nothing if given listener is not a function', () => {
    const emitter = new EventEmitter();
    emitter.removeListener('foo', {}, undefined);
    expect(emitter.listeners).toEqual(new Map());
  });
});
