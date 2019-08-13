<template>
  <div class="browser-window">
    <div class="browser-window__header">
      <div class="browser-window__bullets">
        <span class="bullet bullet--red"></span>
        <span class="bullet bullet--yellow"></span>
        <span class="bullet bullet--green"></span>
      </div>
      <span class="browser-window__title">
        <span class="browser-window__title__scheme">https://</span>
        <span class="browser-window__title__domain">your-vuejs-app.com</span>
        <span class="browser-window__title__query">/tweets/javascript+socket.io</span>
      </span>
    </div>
    <div class="browser-window__body">
      <slot/>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.browser-window {
  width: 80%;
  max-width: 600px;
  max-height: calc(100vh - 94px);
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  box-shadow: 0px 2px 3px 0px rgba(50, 50, 50, 0.11);
  overflow: hidden;

  &__header {
    background: #e8e8e8;
    text-align: left;
    border-radius: 4px 4px 0 0;
    padding: 2px 9px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    max-height: inherit;
    overflow-y: auto;
  }

  &__bullets {
    display: flex;
    flex-wrap: nowrap;
    flex-shrink: 0;
    width: 56px;
  }

  &__title {
    background: #fff;
    display: inline-block;
    flex-basis: 100%;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    box-sizing: border-box;
    text-indent: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &__scheme {
      color: #7ed321;
      opacity: 0.95;
    }

    &__query {
      opacity: 0.5;
    }
  }
}

.bullet {
  height: 11px;
  width: 11px;
  display: inline-block;
  background: #ccc;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;

  &--red {
    background-color: #df7065;
  }

  &--yellow {
    background-color: #e6bb46;
  }

  &--green {
    background-color: #5bcc8b;
  }
}
</style>
