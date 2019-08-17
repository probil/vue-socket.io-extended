import {
  isFunction,
  isSocketIo,
  unwrapIfSingle,
  pipe,
  prefixWith,
  augmentMethod,
} from '..';

describe('isFunction()', () => {
  it('returns false for value other than function', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isFunction(val)).toBe(false);
      });
  });

  it('returns true for arrow function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('returns true for common function', () => {
    // eslint-disable-next-line prefer-arrow-callback
    expect(isFunction(function test() {})).toBe(true);
  });

  it('returns true for class', () => {
    class Test {}
    expect(isFunction(Test)).toBe(true);
  });
});

describe('isSocketIo()', () => {
  it('returns false for value with no socket.io client interface', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isSocketIo(val)).toBe(false);
      });
  });

  it('returns true for object with socket.io client interface', () => {
    const socket = { on: jest.fn(), emit: jest.fn() };
    expect(isSocketIo(socket)).toBe(true);
  });
});

describe('unwrapIfSingle()', () => {
  it('returns first item if given array contains only one item', () => {
    expect(unwrapIfSingle([true])).toBe(true);
    expect(unwrapIfSingle([{}])).toEqual({});
    expect(unwrapIfSingle(['test'])).toBe('test');
    expect(unwrapIfSingle([[]])).toEqual([]);
  });

  it('returns undefined if empty array given', () => {
    expect(unwrapIfSingle([])).toBe(undefined);
  });

  it('returns array as-is if it contains more than one argument', () => {
    expect(unwrapIfSingle([undefined, null, '', true, NaN, 42, {}, []]))
      .toEqual([undefined, null, '', true, NaN, 42, {}, []]);
    expect(unwrapIfSingle([{}, []])).toEqual([{}, []]);
  });

  it('returns value as-is if it\'s not an array', () => {
    [undefined, null, '', true, NaN, 42, {}, Symbol('test')]
      .forEach((val) => {
        expect(unwrapIfSingle(val)).toEqual(val);
      });
  });
});

describe('pipe()', () => {
  it('is a variadic function', () => {
    expect(pipe).toEqual(expect.any(Function));
    expect(pipe).toHaveLength(0);
  });

  it('performs left-to-right function composition', () => {
    const f = pipe(
      (val) => `prefix${val}`,
      (val) => `${val.toUpperCase()}!`,
      (val) => `${val}suffix`,
    );

    expect(f('Hi')).toBe('PREFIXHI!suffix');
  });
});

describe('prefixWith()', () => {
  it('is high order function (2 levels deep)', () => {
    expect(prefixWith).toEqual(expect.any(Function));
    expect(prefixWith()).toEqual(expect.any(Function));
    expect(prefixWith()()).not.toEqual(expect.any(Function));
  });

  it('appends prefix to a string', () => {
    const addHi = prefixWith('Hi');
    expect(addHi(' bro')).toBe('Hi bro');
    expect(addHi('')).toBe('Hi');
  });
});

describe('augmentMethod()', () => {
  it('is a function that accepts 3 arguments', () => {
    expect(augmentMethod).toEqual(expect.any(Function));
    expect(augmentMethod).toHaveLength(3);
  });

  it('calls the callback after original method is called', () => {
    const log = jest.fn();
    const spy = jest.fn();
    const obj = {
      log,
    };
    augmentMethod(obj, 'log', spy);
    obj.log('Hi there');
    expect(log).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('do not call original method nor callback right after augmentation', () => {
    const log = jest.fn();
    const spy = jest.fn();
    const obj = {
      log,
    };
    augmentMethod(obj, 'log', spy);
    expect(log).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('calls original method and callback with the same set of arguments', () => {
    const log = jest.fn();
    const spy = jest.fn();
    const obj = {
      log,
    };
    augmentMethod(obj, 'log', spy);
    const args = ['Hi there', 1, 3, 4, true];
    obj.log(...args);
    expect(log).toHaveBeenCalledWith(...args);
    expect(spy).toHaveBeenCalledWith(...args);
  });
});
