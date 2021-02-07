<template>
  <div class="home">
    <Nav />
    <YtListHome :likeIds="likeIds" :commentIds="commentIds" :loadLikeIds="loadLikeIds" :loadCommentIds="loadCommentIds" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import YtListHome from "@/components/YtListHome.vue";

import commentModel from '@/model/comment';
import likeModel from '@/model/like';

export default {
  name: "Home",
  components: {
    Nav,
    YtListHome,
  },
  data: function() {
    return {
      max: 4,
      likeIds: [],
      commentIds: [],
      loadLikeIds: 0,
      loadCommentIds: 0,
    };
  },
  mounted: function() {
    this.getLikeIds();
    this.getCommentIds();
  },
  methods: {
    getLikeIds: async function() {
      let self = this;
      let i = 0;
      let data = await likeModel.getAll()
      data.forEach((doc) => {
        if (i >= self.max) return;
        self.likeIds.push(doc.data().videoId);
        i++;
      });
      self.loadLikeIds = 1;
    },
    getCommentIds: async function() {
      let self = this;
      let data = await commentModel.getAll()
      data.forEach((doc) => {
        if (self.commentIds.indexOf(doc.data().videoId) >= 0 || 4 <= self.commentIds.length) return;
        self.commentIds.push(doc.data().videoId);
      });
      self.loadCommentIds = 1;
    },
  },
};
</script>
