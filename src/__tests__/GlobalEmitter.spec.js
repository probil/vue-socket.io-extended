import GlobalEmitter from '../GlobalEmitter';
import EventEmitter from '../EventEmitter';

it('should be an object', () => {
  expect(GlobalEmitter).toEqual(expect.any(Object));
});

it('is instance of EventEmitter', () => {
  expect(GlobalEmitter).toBeInstanceOf(EventEmitter);
});
