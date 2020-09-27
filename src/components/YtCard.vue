<template>
  <article class="ytCard" @click="$emit('modal', movie)">
    <div class="ytCard_inner">
      <div class="ytCard_thumb">
        <img v-bind:src="movie.snippet.thumbnails.medium.url" />
      </div>
      <div class="ytCard_body">
        <h1 class="ytCard_ttl">
          {{ movie.snippet.title }}
        </h1>
        <p class="ytCard_desc">{{ movieDescription }}</p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "YtCard",
  props: {
    movie: {},
  },
  computed: {
    movieDescription: function() {
      if (this.movie.snippet.description.length > 30) {
        return this.movie.snippet.description.substr(0, 120) + '…';
      }
      return this.movie.snippet.description;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytCard {
  cursor: pointer;
  height: 100%;
  transition: 0.25s;
  .ytCard_body {
    padding: 10px 10px 20px;
    text-align: left;
  }
  .ytCard_thumb {
    transition: 0.25s;
  }
  .ytCard_ttl {
    margin-bottom: 5px;
  }
  .ytCard_desc {
    font-size: 12px;
  }
  &:hover {
    background: #f9f9f9;
    .ytCard_thumb {
      opacity: 0.8;
    }
  }
}
</style>
