import { mount } from '@vue/test-utils';
import { useSocket, onSocketEvent } from '../composables';
import Main from '../plugin';
import io from '../__mocks__/socket.io-client';

it('useSocket() injects $socket', () => {
  let injectedSocketExtension;
  const wrapper = mount({
    render: () => null,
    setup() {
      injectedSocketExtension = useSocket();
    },
  }, { global: { plugins: [[Main, io('ws://localhost')]] } });
  expect(injectedSocketExtension).toBe(wrapper.vm.$socket);
});

describe('onSocketEvent()', () => {
  it('subscribes to the event', () => {
    const spy = jest.fn();
    const socket = io('ws://localhost');
    mount({
      render: () => null,
      setup() {
        onSocketEvent('event', spy);
      },
    }, { global: { plugins: [[Main, socket]] } });
    socket.fireServerEvent('event', 'data');
    expect(spy).toHaveBeenCalledWith('data');
  });

  it('unsubscribes before unmounted', () => {
    const spy = jest.fn();
    const socket = io('ws://localhost');
    const wrapper = mount({
      render: () => null,
      setup() {
        onSocketEvent('event', spy);
      },
    }, { global: { plugins: [[Main, socket]] } });
    wrapper.unmount();
    socket.fireServerEvent('event', 'data');
    expect(spy).not.toHaveBeenCalled();
  });
});
