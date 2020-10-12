<template>
  <div class="ytList">
    <div class="ytList_inner">
      <ul class="ytList_list">
        <li v-for="movie in results" v-bind:key="movie.id.videoId">
          <YtCard :movie="movie" @modal="openModal" />
        </li>
      </ul>
      <p v-if="!loadYoutube">
        <img src="../assets/images/loader.gif" alt="">
      </p>
    </div>
  </div>
  <transition name="fade">
    <YtModal v-if="active" :active="active" :movie="activeMovie" @close="closeModal" />
  </transition>
</template>

<script>
import YtCard from "@/components/YtCard.vue";
import YtModal from "@/components/YtModal.vue";

export default {
  name: "YtList",
  components: {
    YtCard,
    YtModal,
  },
  data: function() {
    return {
      active: 0,
      activeMovie: {}
    };
  },
  props: {
    results: {},
    loadYoutube: Boolean,
  },
  methods: {
    openModal: function(movie) {
      if(this.active === 1) return;
      this.active = 1;
      this.activeMovie = movie;
    },
    closeModal: function() {
      if(this.active === 0) return;
      this.active = 0;
      this.activeMovie = {};
    }
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
