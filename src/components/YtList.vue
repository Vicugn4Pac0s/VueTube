<template>
  <div class="ytList">
    <div class="ytList_inner">
      <ul class="ytList_list">
        <li
          v-for="movie in results"
          v-bind:key="movie.id.videoId"
        >
          <YtCard :movie="movie" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import YtCard from "@/components/YtCard.vue";

export default {
  name: "YtList",
  components: {
    YtCard,
  },
  props: {
    results: {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytList {
  .ytList_inner {
    margin: 0 auto;
    max-width: 1200px;
  }
  .ytList_list {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 25%;
    }
  }
}
</style>
