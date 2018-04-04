import { eventToAction, isFunction, isSocketIo } from '../';

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
  it('should return false for value other than function', () => {
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

describe('.isSocketIo()', () => {
  it('should return false for value with no socket.io client interface', () => {
    [undefined, null, '', true, NaN, 42, {}, []]
      .forEach((val) => {
        expect(isSocketIo(val)).toBe(false);
      });
  });

  it('should return true for object with socket.io client interface', () => {
    const socket = { on: jest.fn(), emit: jest.fn() };
    expect(isSocketIo(socket)).toBe(true);
  });
});
