<template>
  <div class="commentList">
    {{ comment.comment }}
  </div>
</template>

<script>

export default {
  name: "CommentList",
  components: {},
  data: function() {
  },
  props: {
    comment: {},
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .commentList {

  }
</style>
