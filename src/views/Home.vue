<template>
  <div class="home">
    <ytListHome :likeIds="likeIds" :commentIds="commentIds" :loadLikeIds="loadLikeIds" :loadCommentIds="loadCommentIds" />
  </div>
</template>

<script>
// @ is an alias to /src
import YtListHome from "@/components/YtListHome.vue";

import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Home",
  components: {
    YtListHome,
  },
  data: function() {
    return {
      db: null,
      max: 4,
      likeIds: [],
      commentIds: [],
      loadLikeIds: 0,
      loadCommentIds: 0,
    };
  },
  mounted: function() {
    this.db = firebase.firestore();
    this.getLikeIds();
    this.getCommentIds();
  },
  methods: {
    getLikeIds: function() {
      let self = this;
      self.db
        .collection("like")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          let i = 0;
          snapshot.forEach((doc) => {
            if (self.max <= i) {
              return;
            }
            self.likeIds.push(doc.data().videoId);
            i++;
          });
          self.loadLikeIds = 1;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
    getCommentIds: function() {
      let self = this;
      self.db
        .collection("comment")
        .orderBy("createdAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (self.commentIds.indexOf(doc.data().videoId) >= 0 || 4 <= self.commentIds.length) {
              return;
            }
            self.commentIds.push(doc.data().videoId);
          });
          self.loadCommentIds = 1;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
  },
};
</script>
