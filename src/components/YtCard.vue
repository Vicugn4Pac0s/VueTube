<template>
  <a v-bind:href="'https://www.youtube.com/watch?v=' + movie.id.videoId">
    <article class="ytCard">
      <div class="ytCard_inner">
        <div class="ytCard_thumb">
          <img v-bind:src="movie.snippet.thumbnails.medium.url" />
        </div>
        <div class="ytCard_body">
          <h1 class="ytCard_ttl">
            {{ movie.snippet.title }}
          </h1>
          <p class="ytCard_desc">{{ movie.snippet.description }}</p>
        </div>
      </div>
    </article>
  </a>
</template>

<script>
export default {
  name: "YtCard",
  props: {
    movie: {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytCard {
  .ytCard_body {
    padding: 10px 5px;
    text-align: left;
  }
  .ytCard_ttl {
    margin-bottom: 5px;
  }
  .ytCard_desc {
    font-size: 12px;
  }
}
</style>
