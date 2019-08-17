<template>
  <div id="app">
    <BrowserWindow>
      <p v-if="!tweets.length" class="connecting">
        Listening tweets about
        <strong>javascript</strong> and
        <strong>socket.io</strong> ...
      </p>
      <SlideYUpTransition group>
        <Tweet v-for="tweet in tweets" :key="tweet.id_str" :content="tweet"/>
      </SlideYUpTransition>
    </BrowserWindow>
  </div>
</template>

<script>
import BrowserWindow from "./components/BrowserWindow";
import Tweet from "./components/Tweet";
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "App",
  data: () => ({
    tweets: []
  }),
  sockets: {
    connect() {
      console.log("connected");
    },
    tweet(tweet) {
      this.tweets.unshift(tweet);
      if (this.tweets.length > 100) {
        this.tweets.splice(-1, 1);
      }
    }
  },
  components: {
    BrowserWindow,
    Tweet,
    SlideYUpTransition
  }
};
</script>

<style>
html {
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.connecting {
  font-size: 14px;
  padding: 1rem;
}
</style>
