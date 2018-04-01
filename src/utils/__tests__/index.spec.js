import { eventToAction } from '../';

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
