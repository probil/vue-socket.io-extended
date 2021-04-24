<template>
  <div class="message">
    <div>> {{ message.text }}</div>
    <span class="message--timestamp"> at {{ message.time | localDateTimeString }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    }
  },
  filters: {
    localDateTimeString(value) {
      return new Date(value).toLocaleString()
    }
  }
}
</script>

<style>
.message {
  display: flex;
  justify-content: space-between;
}
.message--timestamp {
  color: gray;
  font-style: italic;
  font-size: 0.8rem;
  flex-shrink: 0;
  align-self: flex-end;
}
</style>
