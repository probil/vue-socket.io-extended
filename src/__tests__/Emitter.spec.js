import Emitter from '../Emitter';

it('should be an object', () => {
  expect(Emitter).toEqual(expect.any(Object));
});

it('should have emitter interface', () => {
  expect(Emitter).toMatchObject({
    addListener: expect.any(Function),
    removeListener: expect.any(Function),
    emit: expect.any(Function),
  });
});
