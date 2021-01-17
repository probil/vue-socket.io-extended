/* eslint-disable no-empty-function,class-methods-use-this,getter-return,max-classes-per-file */
import { Vue } from 'vue-class-component';
import { createApp } from 'vue';
import Socket from '../decorator';

describe('@Socket() decorator', () => {
  it('is a function', () => {
    expect(Socket).toEqual(expect.any(Function));
  });

  it('uses method name as a listener name', () => {
    class App extends Vue {
      render() {
        return '';
      }

      @Socket()
      tweet() {
      }
    }
    const app = createApp(App, {});
    const root = app.mount(document.createElement('div'));

    expect(root.$options.sockets).toMatchObject({
      tweet: expect.any(Function),
    });
  });

  it('uses given name as a listener name', () => {
    class App extends Vue {
      render() {
        return '';
      }

      @Socket('tweet')
      onTweet() {
      }
    }
    const app = createApp(App, {});
    const root = app.mount(document.createElement('div'));

    expect(root.$options.sockets).toEqual({
      tweet: expect.any(Function),
    });
  });

  it('doesn\'t throw an error when decorator used on the computed property and no methods defined on component', () => {
    expect(() => {
      class App extends Vue { // eslint-disable-line no-unused-vars
        render() {
          return '';
        }

        @Socket('tweet')
        get tweets() {
        }
      }
    }).not.toThrow();
  });

  it('doesn\'t throw an error when decorator used on the computed property and some methods defined on component', () => {
    expect(() => {
      class App extends Vue { // eslint-disable-line no-unused-vars
        render() {
          return '';
        }

        @Socket('tweet')
        get tweets() {
        }

        test() {
        }
      }
    }).not.toThrow();
  });

  it('doesn\'t define sockets on component when decorator used on the computed property', () => {
    class App extends Vue {
      render() {
        return '';
      }

      @Socket('tweet')
      get tweets() {
      }
    }

    const app = createApp(App, {});
    const root = app.mount(document.createElement('div'));

    expect(root.$options.sockets).toBeUndefined();
  });
});
