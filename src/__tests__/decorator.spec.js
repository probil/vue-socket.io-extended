import Socket from '../decorator';
import {createLocalVue} from '@vue/test-utils';
import Component from 'vue-class-component'

describe('@Socket() decorator', () => {
  it('is a function', () => {
    expect(Socket).toEqual(expect.any(Function));
  });

  it('uses method name as a listener name', () => {
    const Vue = createLocalVue();

    @Component()
    class App extends Vue {
      @Socket()
      tweet() {
      }
    }

    expect(App.options.sockets).toMatchObject({
      tweet: expect.any(Function)
    })
  });

  it('uses given name as a listener name', () => {
    const Vue = createLocalVue();

    @Component()
    class App extends Vue {
      @Socket('tweet')
      onTweet() {
      }
    }

    expect(App.options.sockets).toEqual({
      tweet: expect.any(Function)
    })
  });

  it(`doesn't throw an error when decorator used on the computed property and no methods defined on component`, () => {
    const Vue = createLocalVue();

    expect(() => {
      @Component()
      class App extends Vue {
        @Socket('tweet')
        get tweets() {
        }
      }
    }).not.toThrow()
  });

  it(`doesn't throw an error when decorator used on the computed property and some methods defined on component`, () => {
    const Vue = createLocalVue();

    expect(() => {
      @Component()
      class App extends Vue {
        @Socket('tweet')
        get tweets() {
        }

        test(){
        }
      }
    }).not.toThrow()
  });

  it(`doesn't define sockets on component when decorator used on the computed property`, () => {
    const Vue = createLocalVue();

    @Component()
    class App extends Vue {
      @Socket('tweet')
      get tweets() {
      };
    }

    expect(App.options.sockets).toBeUndefined();
  })
});
