import { VueDecorator } from 'vue-class-component';

declare const Socket: (eventName?: string) => VueDecorator;

export default Socket;
