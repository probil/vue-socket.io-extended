import { eventToAction, isFunction } from '../';

describe('.eventToAction()', () => {
  it('should be a function', () => {
    expect(eventToAction).toEqual(expect.any(Function));
  });

  it('should correctly convert socket event name to camelcased action name', () => {
    expect(eventToAction('SOCKET_USER_MESSAGE')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_userMessage')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_UserMessage')).toBe('socket_userMessage');
    expect(eventToAction('SOCKET_user-message')).toBe('socket_userMessage');
  });

  it('should add `socket_` prefix to action', () => {
    expect(eventToAction('message')).toBe('socket_message');
    expect(eventToAction('USER_MESSAGE')).toBe('socket_userMessage');
  });
});

describe('.isFunction()', () => {
  it('should return false for values other than function', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isFunction(val)).toBe(false);
      });
  });

  it('should return true for arrow function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('should return true for common function', () => {
    // eslint-disable-next-line prefer-arrow-callback
    expect(isFunction(function test() {})).toBe(true);
  });

  it('should return true for class', () => {
    class Test {}
    expect(isFunction(Test)).toBe(true);
  });
});
