<template>
  <div class="ytModal">
    <div class="ytModal_inner">
      <div class="ytModal_video">
        <iframe
          id="ytplayer"
          type="text/html"
          width="1280"
          height="720"
          :src="
            'https://www.youtube.com/embed/' + movieId + '?autoplay=1'
          "
          frameborder="0"
          v-if="active"
        ></iframe>
      </div>
      <div class="ytModal_likeBtn">
        <likeBtn :videoId="movieId" />    
      </div>
      <commentWrap :videoId="movieId" />      
    </div>
    <div class="ytModal_layer"></div>
    <div class="ytModal_close" @click="$emit('close', $event)">×</div>
  </div>
</template>

<script>
import LikeBtn from "@/components/LikeBtn.vue";
import CommentWrap from "@/components/CommentWrap.vue";

export default {
  name: "YtModal",
  components: {
    LikeBtn,
    CommentWrap
  },
  props: {
    active: Boolean,
    movie: {},
  },
  computed: {
    movieId: function() {
      if(this.movie.id.videoId) {
        return this.movie.id.videoId;
      }
      return this.movie.id;
    }
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytModal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .ytModal_inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    overflow: hidden;
  }
  .ytModal_layer {
    background: #000;
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .ytModal_likeBtn {
    position: absolute;
    bottom: 465px;
    right: 0;
  }
  .ytModal_close {
    color: #fff;
    cursor: pointer;
    font-size: 80px;
    position: absolute;
    top: 0;
    right: 15px;
    line-height: 1;
    transition: .35s;
    &:hover {
      opacity: .5;
    }
  }
  iframe {
    vertical-align: middle;
  }
}
</style>
