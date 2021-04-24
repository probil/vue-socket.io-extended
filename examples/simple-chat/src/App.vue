<template>
  <div id="app">
    <h2>## Chat</h2>
    <div class="chat">
      <div class="message-list">
        <MessagePlaceholder v-if="!messages.length" />
        <Message v-else v-for="(message, index) in messages" :key="index" :message="message"/>
      </div>
      <MessageBox />
    </div>
  </div>
</template>

<script>
import MessagePlaceholder from './MessagePlaceholder'
import Message from './Message'
import MessageBox from './MessageBox'

export default {
  components: {
    MessagePlaceholder,
    Message,
    MessageBox,
  },
  sockets: {
    connect() {
      console.log("connect");
    },
    message(data) {
      this.messages.push(data);
    }
  },
  data() {
    return {
      messages: []
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: auto;
  height: 100%;
  max-width: 600px;
}
.chat {
  overflow: auto;
}

.message-list {
  padding: 20px;
}

</style>
