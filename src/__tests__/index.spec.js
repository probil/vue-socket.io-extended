import index from '../index'
import Main from '../Main'

it('passes this canary test', () => {
  expect(true).toBe(true);
});

it('should re-export `Main` module', () => {
  expect(index).toBe(Main);
});
