<h1 style="text-align: center"> Vue-Socket.io-Extended</h1>

<p align="center">
  <a href="https://circleci.com/gh/probil/vue-socket.io-extended/tree/master"><img src="https://img.shields.io/circleci/project/probil/vue-socket.io-extended/master.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/v/vue-socket.io-extended.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/dt/vue-socket.io-extended.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/l/vue-socket.io-extended.svg" alt="License"></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-2.x-brightgreen.svg" alt="Vue.js 2.x compatible"></a>
  <a href="https://raw.githubusercontent.com/probil/vue-socket.io-extended/master/dist/vue-socket.io-ext.min.js"><img src="https://img.shields.io/github/size/probil/vue-socket.io-extended/dist/vue-socket.io-ext.min.js.svg" alt="Library file size"></a>
</p>

<p align="center">
  Socket.io bindings for Vuejs and Vuex (based on `Vue-Socket.io`)
</p>

## Motivation

I used `Vue-Socket.io` for a long time and I like it. But bugs, lack of support, no tests, no CI and a huge amount of issues makes me cry. So I decided to create my own fork with all the desirable staff (features/fixes/tests/support etc). 

If you'd like to help - create an issue or PR. I will be glad to see any contribution.  Let's make the world a better place :)

## Install

``` bash
npm install vue-socket.io-extended --save
```

## Usage
#### Configuration
Automatic socket connection from an URL string
``` js
import VueSocketio from 'vue-socket.io-extended';

Vue.use(VueSocketio, 'http://socketserver.com:1923');
```

Bind custom socket.io-client instance
``` js
Vue.use(VueSocketio, socketio('http://socketserver.com:1923'));
```

Enable Vuex integration
``` js
import store from './yourstore'

Vue.use(VueSocketio, socketio('http://socketserver.com:1923'), store);
```

#### On Vuejs instance usage
``` js
var vm = new Vue({
  sockets: {
    connect() {
      console.log('socket connected')
    },
    customEmit(val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton(val) {
      // this.$socket is `socket.io-client` instance
      this.$socket.emit('emit_method', val);
    }
  }
})
```

#### Dynamic socket event listeners
Create a new listener
``` js
this.$options.sockets.event_name = (data) => {
  console.log(data)
}
```
Remove existing listener
``` js
delete this.$options.sockets.event_name;
```

#### Vuex Store integration

Socket **mutations** always have `SOCKET_` prefix.

Socket **actions** always have `socket_` prefix and the socket event name is `camelCased` (ex. `SOCKET_USER_MESSAGE` => `socket_userMessage`) 

You can use either one or another or both in your store. Namespaced modules are supported.

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: false,
    message: null,
  },
  mutations: {
    SOCKET_CONNECT: (state, status) => {
      state.isConnected = true;
    },
    SOCKET_USER_MESSAGE: (state, message) => {
      state.message = message;
    },
  },
  actions: {
    otherAction: (context, type) => {
      return true;
    },
    socket_userMessage: ({ commit, dispatch }, message) => {
      dispatch('newMessage', message);
      commit('NEW_MESSAGE_RECEIVED', message);
      if (message.is_important) {
        dispatch('alertImportantMessage', message);
      }
      // ...
    },
  },
})
```
