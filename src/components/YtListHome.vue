<template>
  <div class="ytListHome ytListHome-like">
    <div class="ytListHome_inner">
      <div>
        <HeadingA>最近のお気に入り</HeadingA>
      </div>
      <ul class="ytListHome_list">
        <li v-for="movie in likeMovie" v-bind:key="movie.id">
          <YtCard :movie="movie" @modal="openModal" />
        </li>
      </ul>
    </div>
  </div>
  <transition name="fade">
    <YtModal
      v-if="active"
      :active="active"
      :movie="activeMovie"
      @close="closeModal"
    />
  </transition>
</template>

<script>
import HeadingA from "@/components/HeadingA.vue";
import YtCard from "@/components/YtCard.vue";
import YtModal from "@/components/YtModal.vue";
import axios from "axios";

export default {
  name: "YtListHome",
  components: {
    HeadingA,
    YtCard,
    YtModal,
  },
  data: function() {
    return {
      likeMovie: [],
      //commentMovie: [],
      active: 0,
      activeMovie: {},
    };
  },
  props: {
    likeIds: [],
  },
  computed: {
    txtLikeIds: function() {
      return this.likeIds.join(",");
    },
  },
  methods: {
    openModal: function(movie) {
      if (this.active === 1) return;
      this.active = 1;
      this.activeMovie = movie;
    },
    closeModal: function() {
      if (this.active === 0) return;
      this.active = 0;
      this.activeMovie = {};
    },
  },
  watch: {
    txtLikeIds: function(val) {
      let self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            part: "snippet",
            id: val, // タグを取得したいYouTubeのvideoId
            maxResults: 50,
            key: "AIzaSyCsi0BGE6nKk0a14F5xZTkVqrGebmJ58Pc", // APIキー
          },
        })
        .then(function(res) {
          self.likeMovie = res.data.items;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytListHome {
  .ytListHome_inner {
    margin: 0 auto;
    max-width: 1200px;
  }
  .ytListHome_list {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 25%;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
