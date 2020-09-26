<template>
  <div class="commentList">
    <div class="commentList_inner">
      <p class="commentList_date">{{ date }}</p>
      <p class="commentList_comment">{{ comment.data.comment }}</p>
      <div class="commentList_close" @click="$emit('close', comment)">×</div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "@/utilities/convert.js";

export default {
  name: "CommentList",
  components: {},
  data: function() {},
  computed: {
    date: function() {
      return convertDate(this.comment.data.createdAt.seconds);
    },
  },
  props: {
    comment: {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.commentList {
  background: #fff;
  .commentList_inner {
    padding: 5px 0;
    position: relative;
  }
  .commentList_close {
    cursor: pointer;
    font-size: 21px;
    position: absolute;
    top: 0;
    right: 5px;
  }
}
</style>
