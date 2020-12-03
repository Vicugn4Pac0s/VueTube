<template>
  <div class="commentForm">
    <textarea
      :value="comment"
      name="comment"
      @keyup="$emit('inputted', $event)"
      @keydown.enter.alt.exact="$emit('enter', $event)"
    ></textarea>
    <button @click="$emit('send', $event)">
      送信
    </button>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  data: function() {
    return {};
  },
  props: {
    comment: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.commentForm {
  position: relative;
  textarea {
    background: rgba(255, 255, 255, 0.8);
    border: none;
    vertical-align: middle;
    height: 40px;
    padding-right: 50px;
  }
  button {
    border: none;
    border-radius: 0;
    cursor: pointer;
    line-height: 40px;
    padding: 0;
    width: 50px;

    background: #41B883;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
