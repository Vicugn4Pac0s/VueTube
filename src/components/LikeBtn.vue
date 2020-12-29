<template>
  <div class="likeBtn" :class="{ active: isActive }" @click="toggleLike">
    <span>
      <img :src="iconImgSrc" alt="" />
    </span>
  </div>
</template>

<script>
import likeModel from '@/model/like';

export default {
  name: "LikeBtn",
  components: {},
  props: {
    videoId: String,
  },
  data: function() {
    return {
      isReady: false,
      isActive: false,
    };
  },
  computed: {
    iconImgSrc: function() {
      if (this.isActive) {
        return require("../assets/images/icon-like-active.png");
      }
      return require("../assets/images/icon-like.png");
    },
  },
  mounted: function() {
    this.getLike();
  },
  methods: {
    getLike: async function() {
      let self = this;
      self.likes = [];
      let data = await likeModel.get(self.videoId);
      if (data.docs.length) {
        self.isActive = true;
      }
      self.isReady = true;
    },
    setLike: async function() {
      let self = this;
      self.isReady = false;
      await likeModel.set(self.videoId);

      self.isActive = true;
      self.isReady = true;
    },
    deleteLike: async function() {
      let self = this;
      self.isReady = false;
      let data = await likeModel.get(self.videoId)

      data.forEach((doc) => {
        likeModel.delete(doc.id);
        self.isActive = false;
        self.isReady = true;
      });
    },
    toggleLike: function() {
      if (!this.isReady) {
        return false;
      }
      if (this.isActive) {
        this.deleteLike();
        return false;
      }
      this.setLike();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.likeBtn {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px 0 0px 5px;
  cursor: pointer;
  line-height: 60px;
  width: 35px;

  transition: 0.35s;
  img {
    width: 24px;
  }
  &.active {
  }
}
</style>
