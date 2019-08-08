import GlobalEmitter from '../GlobalEmitter';

it('should be an object', () => {
  expect(GlobalEmitter).toEqual(expect.any(Object));
});

it('should have EventEmitter properties', () => {
  expect(GlobalEmitter).toMatchObject({
    addListener: expect.any(Function),
    removeListenersByLabel: expect.any(Function),
    emit: expect.any(Function),
  });
});
