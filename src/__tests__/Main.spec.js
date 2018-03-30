import Main from '../Main'

it('should be vue plugin (is an object with `install` method)', () => {
  expect(Main).toMatchObject({
    install: expect.any(Function),
  });
});
