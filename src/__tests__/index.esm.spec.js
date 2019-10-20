import VueSocketIoExt, { Socket } from '../index.esm';

it('default export should be a vue plugin', () => {
  expect(VueSocketIoExt).toMatchObject({
    install: expect.any(Function),
  });
});

it('default export should have `defaults` options exported', () => {
  expect(VueSocketIoExt).toMatchObject({
    defaults: expect.any(Object),
  });
});

it('named export `Socket` exists', () => {
  expect(Socket).toEqual(expect.any(Function));
});
