import mixin from '../mixin';

it('should be function', () => {
  expect(mixin).toEqual(expect.any(Function));
});

it('should return object with vue component hooks', () => {
  expect(mixin()).toMatchObject({
    created: expect.any(Function),
    beforeDestroy: expect.any(Function),
  });
});
