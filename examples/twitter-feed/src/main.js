import Vue from "vue";
import App from "./App.vue";
import VueSocketIoExt from "vue-socket.io-extended";
import io from "socket.io-client";

Vue.use(VueSocketIoExt, io("wss://socket-io-tweet-stream.now.sh"));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
