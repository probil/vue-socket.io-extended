import GlobalEmitter from '../GlobalEmitter';

it('should be an object', () => {
  expect(GlobalEmitter).toEqual(expect.any(Object));
});

it('should have emit emitter interface', () => {
  expect(GlobalEmitter).toMatchObject({
    addListener: expect.any(Function),
    removeListener: expect.any(Function),
    emit: expect.any(Function),
  });
});
