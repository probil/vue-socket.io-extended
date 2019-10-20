const VueSocketIoExt = require('../index.umd');

it('should be a vue plugin (is an object with `install` method)', () => {
  expect(VueSocketIoExt).toMatchObject({
    install: expect.any(Function),
  });
});

it('should have `Socket` decorator exported', () => {
  expect(VueSocketIoExt).toMatchObject({
    Socket: expect.any(Function),
  });
});

it('should have `defaults` options exported', () => {
  expect(VueSocketIoExt).toMatchObject({
    defaults: expect.any(Object),
  });
});
