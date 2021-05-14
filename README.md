<h1 align="center" style="text-align:center">Vue-Socket.io-Extended</h1>

<p align="center">
  <a href="https://circleci.com/gh/probil/vue-socket.io-extended/tree/alpha"><img src="https://badgen.net/circleci/github/probil/vue-socket.io-extended/alpha" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/v/vue-socket.io-extended" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/dt/vue-socket.io-extended" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://badgen.net/npm/license/vue-socket.io-extended" alt="License"></a>
  <a href="https://vuejs.org/"><img src="https://badgen.net/badge/Vue/3.x/orange" alt="Vue.js 3.x compatible"></a>
  <a href="https://raw.githubusercontent.com/probil/vue-socket.io-extended/master/dist/vue-socket.io-ext.min.js"><img src="https://badgen.net/bundlephobia/min/vue-socket.io-extended@alpha" alt="Minified library size"></a>
  <a href="https://codecov.io/gh/probil/vue-socket.io-extended"><img src="https://badgen.net/codecov/c/github/probil/vue-socket.io-extended/alpha" alt="Code coverage (codecov)"></a>
  <a href="https://gitter.im/vue-socket-io-extended/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://badgen.net/badge/chat/on%20gitter/cyan" alt="Join us Gitter"></a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended.svg?type=shield"/></a>
</p>

<p align="center">
  Socket.io bindings for Vue.js 2 and Vuex (inspired by Vue-Socket.io)
</p>

<p align="center">
  <a href="https://codesandbox.io/s/oxqpm54pnq?fontsize=14&module=%2Fsrc%2FApp.vue"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit Vue Socket IO Extended Twitter feed demo"/></a>
</p>
<p align="center">
  <a href='https://ko-fi.com/R5R1119O3' target='_blank'><img height='36' style='border:0;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
</p>


> :warning: [The alpha version of v5](https://github.com/probil/vue-socket.io-extended/tree/alpha) (with Vue 3 support) has been released. Your feedback would be appreciated [here](https://github.com/probil/vue-socket.io-extended/issues/489) 


## :cherries: Features

- Lightweight and dependency free - only 2kb min gzip
- Reactive properties `$socket.connected` and `$socket.disconnected`
- Listening and emitting `socket.io` events inside components
- Auto-dispatches actions and mutations in multiple namespaced Vuex modules on `socket.io` events
- Good TypeScript support (decorator and typing)
- Can be used with any version of `socket.io-client`
- Custom options - tweak the library to better fit your project needs
- etc...

## :heavy_check_mark: Browser Support

|![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --- | --- | --- | --- | --- |
| 49+ :heavy_check_mark: | 18+ :heavy_check_mark:  | 10+ :heavy_check_mark: | 36+ :heavy_check_mark: | 12+ :heavy_check_mark: |

We support only browsers with global usage statistics greater than 1% and due to current Vue 3 limitation - with native [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) support.

## :seedling: Motivation

I was using [`Vue-Socket.io`](https://github.com/MetinSeylan/Vue-Socket.io) for few months. I've liked the idea, but the more I used it the more I faced with bugs, outdated documentation, lack of support, absence of tests, and a huge amount of issues :disappointed:. That slowed down development of the product I was working on. So I ended up with a decision to create my own fork with all the desirable stuff (features/fixes/tests/support/CI checks etc). That's how `vue-socket.io-extended` was born.

If you'd like to help - create an issue or PR. I will be glad to see any contribution.  Let's make the world a better place :heart:

## :grey_exclamation: Prerequisites

You must have a running Socket.IO server before starting any Vue/Socket.IO project! Instructions on how to build a Node/Socket.IO server can be found [here](https://socket.io).

## :grey_exclamation: Software Requirements

- [Vue.js](https://vuejs.org/) `3.X`
- [Socket.io-client](https://socket.io) `>= 2.X`
- [Vuex](https://vuex.vuejs.org/) `>= 4.X` (optional)

## :cd: Installation

```bash
npm install vue-socket.io-extended@alpha socket.io-client
```

## :checkered_flag: Initialization

#### ES2015 (Webpack/Rollup/Browserify/Parcel/etc)
```js
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import { createApp } from 'vue';

const socket = io('http://socketserver.com:1923');

const app = createApp({});
app.use(VueSocketIOExt, socket);
```
*Note:* you have to pass instance of `socket.io-client` as second argument to prevent library duplication. Read more [here](https://github.com/probil/vue-socket.io-extended/issues/19).

#### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue@next/dist/vue.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/socket.io-client/dist/socket.io.slim.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-socket.io-extended@alpha"></script>
<script>
  var socket = io('http://socketserver.com:1923');
  var app = Vue.createApp({});
  app.use(VueSocketIOExt, socket);
</script>
```

## :rocket: Usage

#### On Vue.js component

Define your listeners under `sockets` section, and they will be executed on corresponding `socket.io` events automatically.

```js
createApp({
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
```js
this.$socket.$subscribe('event_name', payload => {
  console.log(payload)
});
```
Remove existing listener
```js
this.$socket.$unsubscribe('event_name');
```

#### Reactive properties (new in v4)
The `$socket.connected` and `$socket.diconnected` are reactive. That means you can use them in expressions
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

## :evergreen_tree: Vuex Store Integration

#### Setup

To set up Vuex integration just pass the store as the third argument. In a Vue CLI project, you might do this in the `src/main.js` file. Example:

```js
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import store from './store'

const socket = io('http://socketserver.com:1923');
const app = createApp({});

app.use(VueSocketIOExt, socket, { store });
```

#### Receiving Events

Mutations and actions will be dispatched or committed automatically in the Vuex store when a socket event arrives.  A mutation or action must follow the naming convention below to recognize and handle a socket event.

* A **mutation** should start with `SOCKET_` prefix and continue with an uppercase version of the event
* An **action** should start with `socket_` prefix and continue with camelcase version of the event

| Server Event | Mutation | Action
| --- | --- | --- |
| `chat message` | `SOCKET_CHAT MESSAGE` | `socket_chatMessage` |
| `chat_message` | `SOCKET_CHAT_MESSAGE` | `socket_chatMessage` |
| `chatMessage`  | `SOCKET_CHATMESSAGE`  | `socket_chatMessage` |
| `CHAT_MESSAGE` | `SOCKET_CHAT_MESSAGE` | `socket_chatMessage` |

Check the [Configuration](#gear-configuration) section if you'd like to use a custom transformation.

Check the [Migration from VueSocketIO](#information_source-migration-from-vuesocketio) section if you want to keep actions names in UPPER_CASE.

```js
// In this example we have a socket.io server that sends message ID when it arrives
// so to get entire body of the message we need to make AJAX call the server
import { createStore } from 'vuex';

// `MessagesAPI.downloadMessageById` is an async function (goes to backend through REST Api and fetches all message data)
import MessagesAPI from './api/message'

export default createStore({
  state: {
    // we store messages as a dictionary for easier access and interaction
    // @see https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
    messages: {},
    messagesOrder: []
  },
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

#### Emitting Events

Events can be sent to the Socket.IO server by calling `this._vm.$socket.client.emit` from a Vuex mutation or action. Mutation or action names are not subject to the same naming requirements as above. More than one argument can be included. [All serializable data structures are supported](https://socket.io/docs/client-api/#socket-emit-eventName-%E2%80%A6args-ack), including Buffer.

```js
  actions: {
    emitSocketEvent(data) {
      this._vm.$socket.client.emit('eventName', data);
      this._vm.$socket.client.emit('with-binary', 1, '2', { 3: '4', 5: new Buffer(6) });
    }
  }
```

#### Namespaced Vuex Modules

Namespaced modules are supported out-of-the-box. Any appropriately-named mutation or action should work regardless of whether it's in a module or in the main Vuex store.

```js
import { createStore } from 'vuex';

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
};

export default createStore({
  modules: {
    messages,
    notifications,
  }
})
```
The above code will:
* Commit the `SOCKET_CHAT_MESSAGE` mutation in the `messages` module
* Commit the `SOCKET_CHAT_MESSAGE` mutation in the `notification` module
* Dispatch the `socket_chatMessage` action in the `messages` module

## :bamboo: ECMAScript / TypeScript decorator (added in v4)

**Required**: [ECMAScript stage 1 decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md).
If you use Babel, [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) is needed.
If you use TypeScript, enable `--experimentalDecorators` flag.

> It does not support the stage 2 decorators yet since mainstream transpilers still transpile to the old decorators.

We provide `@Socket()` decorator for users of [class-style Vue components](https://github.com/vuejs/vue-class-component). By default, `@Socket()` decorator listens the same event as decorated method name, but you can use custom name by passing a string inside decorator e.g. `@Socket('custom_event')`.

Check the example below:

```vue
<!-- App.vue -->
<script>
import { Options, Vue } from 'vue-class-component';
import Socket from 'vue-socket.io-extended/decorator';

@Options({})
export default class App extends Vue {
  @Socket() // --> listens to the event by method name, e.g. `connect`
  connect () {
    console.log('connection established');
  }

  @Socket('tweet')  // --> listens to the event with given name, e.g. `tweet`
  onTweet (tweetInfo) {
    // do something with `tweetInfo`
  }
}
</script>
```

## :mountain_bicyclist: Usage with Nuxt.js

:warning: [The current version of Nuxt.js (v2) doesn't support Vue 3 just yet](https://github.com/nuxt/nuxt.js/issues/8395). The section is going to be updated after the initial release. Check [v4](https://github.com/probil/vue-socket.io-extended/tree/v4.0.6#mountain_bicyclist-usage-with-quasar-framework) for integration with Vue 2 & Next 2

## :mountain_bicyclist: Usage with Quasar Framework

:warning: [The current version of Quasar (v1) doesn't support Vue 3 just yet](https://github.com/quasarframework/quasar/issues/7836). Beta version is planned for Jan 2021 though, while the final version is expected to be released in Q1. The section is going to be updated after the initial release. Check [v4](https://github.com/probil/vue-socket.io-extended#mountain_bicyclist-usage-with-quasar-framework) for integration with Vue 2 & Quasar 1

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
| eventMapping | `Function` `socket => string` | | Map your event from socket event data 

*FYI:* You can always access default plugin options if you need it (e.g. re-use default `eventToActionTransformer` function):

```js
import VueSocketIOExt from 'vue-socket.io-extended';
VueSocketIOExt.defaults // -> { actionPrefix: '...', mutationPrefix: '...', ... }
```

## :information_source: Migration from VueSocketIO

For those who has migrated from old VueSocketIO to this package on existing project there is an easy way to migrate without rewriting exiting store modules.
You need to redefine 2 parameters so `vue-socket.io-extended` would support the same format of actions as in `vue-socket.io`.

```js
import VueSocketIO from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const ioInstance = io('https://hostname/path');
app.use(VueSocketIO, ioInstance, {
  store, // vuex store instance
  actionPrefix: 'SOCKET_', // keep prefix in uppercase
  eventToActionTransformer: (actionName) => actionName // cancel camel case
});
```

**Note**: Since `vue-socket.io` seems to be active again the instructions might not work as described above. If you are migrating and facing some issues just create an issue with a short description of the problem. I'll try to update instructions, so you can make use of them.

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
