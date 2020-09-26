<template>
  <div class="commentWrap" :class="{ active: isActive }">
    <comment :videoId="videoId" /> 
    <div class="commentWrap_toggle" @click="commentToggle">
      <img alt="Vue logo" src="../assets/images/icon-comment.png">
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";

export default {
  name: "CommentWrap",
  components: {
    Comment,
  },
  data: function() {
    return {
      isActive: false,
    };
  },
  props: {
    videoId: String,
  },
  mounted: function() {},
  methods: {
    commentToggle: function() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.commentWrap {
  position: absolute;
  bottom: 0;
  right: 0;

  transition: 0.5s;
  transform: translate(280px, 0);
  .commentWrap_toggle {
    background: rgba(65, 184, 131, 0.5);
    border-radius: 5px 0 0px 5px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    top: 0;
    left: -35px;
    line-height: 60px;
    width: 35px;
    img {
      width: 20px;
    }
  }
  &.active {
    transform: translate(0, 0);
    .commentWrap_toggle {
      background: rgba(65, 184, 131, 1);
    }
  }
}
</style>
