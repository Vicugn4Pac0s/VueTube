<template>
  <div class="commentList">
    {{ date }}
    {{ comment.comment }}
  </div>
</template>

<script>

import { convertDate } from '@/utilities/convert.js';

export default {
  name: "CommentList",
  components: {},
  data: function() {
  },
  computed: {
    date: function() {
      return convertDate(this.comment.createdAt.seconds);
    }
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
