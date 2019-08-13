<template>
  <div class="tweet">
    <div class="tweet__image-wrap">
      <img
        :src="content.user.profile_image_url_https"
        alt="Profile image"
        class="tweet__profile-pic"
      >
    </div>
    <div class="tweet__body-wrap">
      <div class="tweet__headline">
        <span class="tweet__author-name">{{content.user.name}}</span>
        <span class="tweet__author-screen-name">@{{content.user.screen_name}}</span>
      </div>
      <div class="tweet__text">{{content.text}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="stylus" scoped>
$image-size = 40px;

.tweet {
  min-height: 20px;
  padding: 0.8rem 1rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;

  &:hover {
    background-color: #f5f8fa;
    cursor: pointer;
  }

  &__image-wrap {
    flex-basis: $image-size;
    margin: 0 5px;
    display: flex;
  }

  &__body-wrap {
    flex-grow: 1;
    margin: 0 5px;
    text-align: left;
  }

  &__profile-pic {
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: rgb(29, 161, 242);
    height: $image-size;
    width: $image-size;
  }

  &__headline {
    font-size: 14px;
  }

  &__author-name {
    font-weight: bold;
  }

  &__author-screen-name {
    margin-left: 5px;
    color: rgb(101, 119, 134);
  }

  &__text {
    margin-top: 4px;
    font-size: 14px;
  }
}
</style>



