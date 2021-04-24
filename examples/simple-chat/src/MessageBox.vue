<template>
  <div class="message-box">
    <textarea
      rows="1"
      placeholder="Type your message here, press Enter to submit"
      class="message-box__input"
      v-model="enteredMessage"
      @keypress.enter.prevent="handleSubmit"
    />
    <button
      type="button"
      class="message-box__submit"
      @click="handleSubmit"
      :disabled="!enteredMessage"
    >Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      if(!this.enteredMessage) return;
      this.$socket.client.emit("message", {
        msg: this.enteredMessage
      });
      this.enteredMessage = "";
    }
  },
}
</script>

<style>
.message-box {
  border: 1px solid gray;
  padding: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
}
.message-box__input {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.message-box__submit {
  height: 40px;
}
</style>
