<template>
  <div class="commentForm">
    <textarea :value="comment" name="comment" cols="30" rows="10" @input="$emit('inputted', $event)"></textarea>
    <button @click="$emit('send', $event)">
      送信
    </button>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {
  },
  data: function() {
    return {};
  },
  props: {
    'comment': String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.commentForm {
  margin-bottom: 20px;
  textarea {
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
