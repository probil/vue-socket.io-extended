<h1 align="center" style="text-align:center">Vue-Socket.io-Extended</h1>

<p align="center">
  <a href="https://circleci.com/gh/probil/vue-socket.io-extended/tree/master"><img src="https://badgen.net/circleci/github/probil/vue-socket.io-extended/master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/v/vue-socket.io-extended" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/dt/vue-socket.io-extended" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/license/vue-socket.io-extended" alt="License"></a>
  <a href="https://vuejs.org/"><img src="https://badgen.net/badge/Vue/2.x/orange" alt="Vue.js 2.x compatible"></a>
  <a href="https://raw.githubusercontent.com/probil/vue-socket.io-extended/master/dist/vue-socket.io-ext.min.js"><img src="https://badgen.net/bundlephobia/min/vue-socket.io-extended" alt="Minified library size"></a>
  <a href="https://codecov.io/gh/probil/vue-socket.io-extended"><img src="https://badgen.net/codecov/c/github/probil/vue-socket.io-extended/master" alt="Code coverage (codecov)"></a>
  <a href="https://gitter.im/vue-socket-io-extended/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://badgen.net/badge/chat/on%20gitter/cyan" alt="Join us Gitter"></a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended.svg?type=shield"/></a>
</p>

<p align="center">
  Socket.io bindings for Vue.js and Vuex (inspired by Vue-Socket.io)
</p>

<p align="center">
  <a href="https://codesandbox.io/s/oxqpm54pnq?fontsize=14&module=%2Fsrc%2FApp.vue"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit Vue Socket IO Extended Twitter feed demo"/></a>
</p>

## :cherries: Features

- Listen and emit `socket.io` events inside components
- Dispatch actions and mutations in Vuex store on `socket.io` events
- Support namespaced Vuex modules out-of-the-box
- Listen for one server event from the multiple stores at the same time
- Support for multiple arguments from the server (when more then one argument passed - payload is wrapped to array automatically)
- Possibility to define `socket.io` listeners in components dynamically
- Options support - tweak the library to better fit your project needs
- And many other...

## :heavy_check_mark: Browser Support

|![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --- | --- | --- | --- | --- | --- |
| 38+ :heavy_check_mark: | 13+ :heavy_check_mark:  | 8+ :heavy_check_mark: | 25+ :heavy_check_mark: | 12+ :heavy_check_mark: | 11+ :heavy_check_mark: |
 


## :seedling: Motivation

I was using [`Vue-Socket.io`](https://github.com/MetinSeylan/Vue-Socket.io) for few months. I've liked the idea, but the more I used it the more I faced with bugs, outdated documentation, lack of support, absence of tests and a huge amount of issues :disappointed:. That slowed down development of the product I was working on. So I ended up with a decision to create my own fork with all the desirable stuff (features/fixes/tests/support/CI checks etc). That's how `vue-socket.io-extended` was born.

If you'd like to help - create an issue or PR. I will be glad to see any contribution.  Let's make the world a better place :heart:

## :grey_exclamation: Requirements

- [Vue.js](https://vuejs.org/) `>=2.X`
- [Socket.io-client](https://socket.io) `>=2.X`
- [Vuex](https://vuex.vuejs.org/) `>=2.X` (optional, for integration with Vuex only)

## :cd: Installation

```bash
npm install vue-socket.io-extended socket.io-client
```

## :checkered_flag: Initialization

#### ES2015 (Webpack/Rollup/Browserify/Parcel/etc)
```js
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.use(VueSocketio, io('http://socketserver.com:1923'));
```
*Note:* you have to pass instance of `socket.io-client` as second argument to prevent library duplication. Read more [here](https://github.com/probil/vue-socket.io-extended/issues/19).

#### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/socket.io-client/dist/socket.io.slim.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-socket.io-extended"></script>
<script>
  Vue.use(VueSocketIOExt, io('http://socketserver.com:1923'));
</script>
```

## :rocket: Usage

#### On Vue.js component

Define your listeners under `sockets` section and they will listen coresponding `socket.io` events automatically.

```js
new Vue({
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
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit('emit_method', val);
    }
  }
})
```

**Note**: Don't use arrow functions for methods or listeners if you are going to emit `socket.io` events inside. You will end up with using incorrect `this`. More info about this [here](https://github.com/probil/vue-socket.io-extended/issues/61)

#### Dynamic socket event listeners (changed in v4)

Create a new listener
``` js
this.$subscribe('event_name', payload => {
  console.log(payload)
});
```
Remove existing listener
``` js
this.$unsubscribe('even_name');
```

#### Reactive properties (new in v4)
`$socket.connected` and `$socket.diconnected` are reactive. That means you can use them in expressions
```vue
<template>
  <div>
    <span>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</span>
  </div>
</template>
```
Or conditions
```vue
<template>
  <span 
    class="notification" 
    v-if="$socket.disconnected"
  >
    You are disconnected
  </span>
</template>
```
Or computed properties, methods and hooks. Treat them as computed properties that are available in all components

## :evergreen_tree: Vuex Store integration

To enable Vuex integration just pass the store as the third argument, e.g.:
```js
import store from './store'

Vue.use(VueSocketio, io('http://socketserver.com:1923'), { store });
```

The main idea behind the integration is that mutations and actions are dispatched/committed automatically on Vuex store when server socket event arrives. Not every mutation and action is invoked. It should follow special formatting convention, so the plugin can easily determine which one should be called. 

* a **mutation** should start with `SOCKET_` prefix and continue with an uppercase version of the event
* an **action** should start with `socket_` prefix and continue with camelcase version of the event

| Server Event | Mutation | Action
| --- | --- | --- |
| `chat message` | `SOCKET_CHAT MESSAGE` | `socket_chatMessage` |
| `chat_message` | `SOCKET_CHAT_MESSAGE` | `socket_chatMessage` |
| `chatMessage`  | `SOCKET_CHATMESSAGE`  | `socket_chatMessage` |
| `CHAT_MESSAGE` | `SOCKET_CHAT_MESSAGE` | `socket_chatMessage` |

Check [Configuration](#gear-configuration) section if you'd like to use custom transformation.

**Note**: different server events can commit/dispatch the same mutation or/and the same action. So try to use only one naming convention to avoid possible bugs. In any case, this behavior is going to be changed soon and considered as problematic.

You can use either mutation or action or even both in your store. Don't forget that mutations are synchronous transactions. If you have any async operations inside, it's better to use actions instead. Learn more about Vuex [here](https://vuex.vuejs.org/en/).

```js
// In this example we have a socket.io server that sends message ID when it arrives
// so to get entire body of the message we need to make AJAX call the server
import Vue from 'vue'
import Vuex from 'vuex'

// `MessagesAPI.downloadMessageById` is async function (goes to backend through REST Api and fetches all the info about message)
import MessagesAPI from './api/message'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // we store messages as a dictionary for easier access and interaction
    // @see https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
    messages: {},
    messagesOrder: []
  }
  mutations: {
    NEW_MESSAGE(state, message) {
      state.messages[message.id] = message;
      state.messagesOrder.push(message.id);
    }
  },
  actions: {
    socket_userMessage ({ dispatch, commit }, messageId) { // <-- this action is triggered when `user_message` is emmited on the server
      return MessagesAPI.downloadMessageById(messageId).then((message) => {
       commit('NEW_MESSAGE', message);
      })
    }
  }
})
```

#### Namespaced vuex modules

Namespaced modules are supported out-of-the-box when plugin initialized with Vuex store. You can easily divide your store into modules without worrying that mutation or action will not be called. The plugin checks all your modules for mutation and action that are formatted by convention described above and call them all. That means you can listen for the same event from multiple stores with no issue.

Check the following example:

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const messages = {
  state: {
    messages: []
  },
  mutations: {
    SOCKET_CHAT_MESSAGE(state, message) {
      state.messages.push(message);
    }
  },
  actions: {
    socket_chatMessage() {
      console.log('this action will be called');
    }
  },
};

const notifications = {
  state: {
    notifications: []
  },
  mutations: {
    SOCKET_CHAT_MESSAGE(state, message) {
      state.notifications.push({ type: 'message', payload: message });
    }
  },
}

export default new Vuex.Store({
  modules: {
    messages,
    notifications,
  }
})
```
That's what will happen, on `chat_message` from the server:
* `SOCKET_CHAT_MESSAGE` mutation commited on `messages` module
* `SOCKET_CHAT_MESSAGE` mutation commited on `notification` module
* `socket_chatMessage` action dispatched on `messages` module

## :mountain_bicyclist: Usage with Nuxt.js
> The key point here is to disable SSR for the plugin as it will crash otherwise. It's a well-know issue and we are going to fix it. Thanks [@ll931217](https://github.com/ll931217) for investigation.

**1. Create plugin**:
```js
// ~/plugins/socket.io.js
import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';

export default ({ store }) => {
  Vue.use(VueSocketIO, io('http://localhost:3000'), { store });
}
```

**2. Then register it**:

```js
// nuxt.config.js
module.exports = {
  //...,
  plugins: [
    //...,
    { 
      src: '~/plugins/socket.io.js',
      ssr: false,                    // <-- this line is required
    },
  ]
}
```

## :gear: Configuration

In addition to store instance, `vue-socket.io-extended` accepts other options. 
Here they are:

| Option | Type | Default | Description |
| ---- | ---- | ------- | ------- |
| `store` | `Object` | `undefined` | Vuex store instance, enables vuex integration |
| `actionPrefix` | `String` | `'socket_'` | Prepend to event name while converting event to action. Empty string disables prefixing |
| `mutationPrefix` | `String` | `'SOCKET_'` | Prepend to event name while converting event to mutation. Empty string disables prefixing |  
| `eventToMutationTransformer` | `Function` `string => string` | uppercase function | Determines how event name converted to mutation |
| `eventToActionTransformer` | `Function` `string => string` | camelcase function | Determines how event name converted to action |

*FYI:* You can always access default plugin options if you need it (e.g. re-use default `eventToActionTransformer` function):

```js
import VueSocketIOExt from 'vue-socket.io-extended';
VueSocketIOExt.defaults // -> { actionPrefix: '...', mutationPrefix: '...', ... }
```
## :question: FAQ

- [How to prevent connection until authed?](https://github.com/probil/vue-socket.io-extended/issues/114#issuecomment-405411500)

- [How to receive/emit event from server to the particular user?](https://github.com/probil/vue-socket.io-extended/issues/71#issuecomment-390820203) (check also [this](https://gitter.im/vue-socket-io-extended/Lobby?at=5bbc9973ef4afc4f2842d0bc))

- [How access this.$socket from Vuex actions?](https://github.com/probil/vue-socket.io-extended/issues/91#issuecomment-397232621)

- [My mutation is triggered two times?](https://github.com/probil/vue-socket.io-extended/issues/185)

- [Mutations and actions are not fired while using Quasar](https://github.com/probil/vue-socket.io-extended/issues/384#issuecomment-517736400)

## :anchor: Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/).

## :newspaper: Changelog

We're using [GitHub Releases](https://github.com/probil/vue-socket.io-extended/releases).

## :beers: Contribution

We're more than happy to see potential contributions, so don't hesitate. If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/probil/vue-socket.io-extended/issues/new), but first please make sure your question does not repeat previous ones.

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended?ref=badge_large)
