<h1 align="center" style="text-align:center">Vue-Socket.io-Extended</h1>

<p align="center">
  <a href="https://circleci.com/gh/probil/vue-socket.io-extended/tree/master"><img src="https://img.shields.io/circleci/project/github/probil/vue-socket.io-extended/master.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/v/vue-socket.io-extended.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/dt/vue-socket.io-extended.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-socket.io-extended"><img src="https://img.shields.io/npm/l/vue-socket.io-extended.svg" alt="License"></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-2.x-brightgreen.svg" alt="Vue.js 2.x compatible"></a>
  <a href="https://raw.githubusercontent.com/probil/vue-socket.io-extended/master/dist/vue-socket.io-ext.min.js"><img src="https://img.shields.io/github/size/probil/vue-socket.io-extended/dist/vue-socket.io-ext.min.js.svg" alt="Library file size"></a>
  <a href="https://codecov.io/gh/probil/vue-socket.io-extended"><img src="https://img.shields.io/codecov/c/github/probil/vue-socket.io-extended/master.svg" alt="Code coverage (codecov)"></a>
  <a href="https://gitter.im/vue-socket-io-extended/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Join us Gitter"></a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended.svg?type=shield"/></a>
</p>

<p align="center">
  Socket.io bindings for Vue.js and Vuex (based on `Vue-Socket.io`)
</p>

## :cherries: Features

- Listen and emit `socket.io` events inside components
- Dispatch actions and mutations in Vuex store on `socket.io` events
- Support namespaced Vuex modules out-of-the-box
- Listen for one server event from the few stores at the same time
- Support for multiple arguments from the server (when more then one argument passed - payload is wrapped to array automatically)
- Ability to define `socket.io` listeners in components dynamically
- Options support - tweak the library to better fit your project needs

## :heavy_check_mark: Browser Support

-- |![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- | --- |
Basic support <sup>[*](#dynamic-socket-event-listeners)</sup> | 38+ :heavy_check_mark: | 13+ :heavy_check_mark:  | 8+ :heavy_check_mark: | 25+ :heavy_check_mark: | 12+ :heavy_check_mark: | 11+ :heavy_check_mark: |
Full support | 49+ :heavy_check_mark: | 18+ :heavy_check_mark: | 10+ :heavy_check_mark: | 36+ :heavy_check_mark: | 12+ :heavy_check_mark: | :x: |
 


## :seedling: Motivation

I used `Vue-Socket.io` for a long time and I like it. But bugs, lack of support, no tests, no CI and a huge amount of issues makes me cry. So I decided to create my own fork with all the desirable staff (features/fixes/tests/support etc). 

If you'd like to help - create an issue or PR. I will be glad to see any contribution.  Let's make the world a better place :)

## :grey_exclamation: Requirements

- [Vue.js](https://vuejs.org/) `>=2.X`
- [Socket.io-client](https://socket.io) `>=2.X`
- [Vuex](https://vuex.vuejs.org/) `>=2.X` (optional, for integration with Vuex only)

## :cd: Installation

``` bash
npm install vue-socket.io-extended
```

## :checkered_flag: Initialization

#### ES2015 (Webpack/Rollup/Browserify/Parcel/etc)
``` js
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.use(VueSocketio, io('http://socketserver.com:1923'));
```
*Note:* you have to pass instance of `socket.io-client` as second argument to prevent library duplication. Read more [here](https://github.com/probil/vue-socket.io-extended/issues/19).

#### UMD (Browser)

``` html
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

``` js
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
      // this.$socket is `socket.io-client` instance
      this.$socket.emit('emit_method', val);
    }
  }
})
```

**Note**: Don't use arrow functions for methods or listeners if you are going to emit `socket.io` events inside. You will end up with using incorrect `this`. More info about this [here](https://github.com/probil/vue-socket.io-extended/issues/61)

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
**Note**: This feature supported only in [browsers with native Proxy API support](https://caniuse.com/#feat=proxy) (e.g. IE11 is not supported)

## :evergreen_tree: Vuex Store integration

To enable Vuex integration just pass the store as the third argument, e.g.:
``` js
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
    SOCKET_CONNECT(state, status) {
      state.isConnected = true;
    },
    SOCKET_USER_MESSAGE(state, message) {
      state.message = message;
    },
  },
  actions: {
    otherAction(context, type) {
      return true;
    },
    socket_userMessage({ commit, dispatch }, message) {
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
* `socket_chatMessage` action dispated on `messages` module

## :gear: Configuration

In addition to store instance, `vue-socket.io-extended` accepts other options. 
Here they are:

| Option | Type | Default | Description |
| ---- | ---- | ------- | ------- |
| `store` | `Object` | `undefined` | Vuex store instance, enables vuex integration |
| `actionPrefix` | `String` | `'socket_'` | Append to event name while converting event to action. Empty string disables prefixing |
| `mutationPrefix` | `String` | `'SOCKET_'` | Append to event name while converting event to mutation. Empty string disables prefixing |  
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

## :anchor: Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/).

## :newspaper: Changelog

We're using [GitHub Releases](https://github.com/probil/vue-socket.io-extended/releases).

## :beers: Contribution

We're more than happy to see potential contributions, so don't hesitate. If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/probil/vue-socket.io-extended/issues/new), but first please make sure your question does not repeat previous ones.

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fprobil%2Fvue-socket.io-extended?ref=badge_large)
