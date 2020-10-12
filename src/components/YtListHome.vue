<template>
  <div class="ytListHome ytListHome-like">
    <div class="ytListHome_inner">
      <section class="ytListHome_sec">
        <div>
          <HeadingA>最近のお気に入り</HeadingA>
        </div>
        <div class="ytListHome_body">
          <ul class="ytListHome_list">
            <li v-for="movie in likeMovie" v-bind:key="movie.id">
              <YtCard :movie="movie" @modal="openModal" />
            </li>
          </ul>
          <p class="ytListHome_loader" v-if="!loadLikeIds">
            <img src="../assets/images/loader.gif" alt="" />
          </p>
          <p class="ytListHome_none" v-if="loadLikeIds && txtLikeIds === ''">
            最近のお気に入りはありません。
          </p>
        </div>
      </section>

      <section class="ytListHome_sec">
        <div>
          <HeadingA>最近のコメント</HeadingA>
        </div>
        <div class="ytListHome_body">
          <ul class="ytListHome_list">
            <li v-for="movie in commentMovie" v-bind:key="movie.id">
              <YtCard :movie="movie" @modal="openModal" />
            </li>
          </ul>
          <p class="ytListHome_loader" v-if="!loadCommentIds">
            <img src="../assets/images/loader.gif" alt="" />
          </p>
          <p
            class="ytListHome_none"
            v-if="loadCommentIds && txtCommentIds === ''"
          >
            最近のコメントはありません。
          </p>
        </div>
      </section>
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
      commentMovie: [],
      active: 0,
      activeMovie: {},
    };
  },
  props: {
    likeIds: [],
    commentIds: [],
    loadLikeIds: Boolean,
    loadCommentIds: Boolean,
  },
  computed: {
    txtLikeIds: function() {
      return this.likeIds.join(",");
    },
    txtCommentIds: function() {
      return this.commentIds.join(",");
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
    txtCommentIds: function(val) {
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
          self.commentMovie = res.data.items;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ytListHome {
  .ytListHome_sec {
    margin-bottom: 40px;
  }
  .ytListHome_inner {
    margin: 0 auto;
    max-width: 1200px;
  }
  .ytListHome_body {
    min-height: 240px;
    position: relative;
  }
  .ytListHome_list {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 25%;
    }
  }
  .ytListHome_loader, .ytListHome_none {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
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
