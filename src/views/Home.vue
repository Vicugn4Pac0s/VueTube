<template>
  <div class="home">
    <ytListHome :likeIds="likeIds" />
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
    };
  },
  mounted: function() {
    this.db = firebase.firestore();
    this.getLikeIds();
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
            if(self.max <= i) {
              return;
            }
            self.likeIds.push(doc.data().videoId);
            i++;
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
  },
};
</script>
