import Vue from 'vue';
import VueSocketIoExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import App from './App.vue';

Vue.use(VueSocketIoExt, io('wss://socketio-tweet-stream.herokuapp.com'));

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
