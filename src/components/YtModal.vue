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
            'https://www.youtube.com/embed/' + movie.id.videoId + '?autoplay=1'
          "
          frameborder="0"
          v-if="active"
        ></iframe>
      </div>
      <commentWrap :videoId="movie.id.videoId" />      
    </div>
    <div class="ytModal_layer" @click="$emit('close', $event)"></div>
  </div>
</template>

<script>
import CommentWrap from "@/components/CommentWrap.vue";

export default {
  name: "YtModal",
  components: {
    CommentWrap
  },
  props: {
    active: Boolean,
    movie: {},
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
    background: #41b883;
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  iframe {
    vertical-align: middle;
  }
}
</style>
