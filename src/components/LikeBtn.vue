<template>
  <div class="likeBtn" :class="{ active: isActive }" @click="toggleLike">
    <span>
      <img :src="iconImgSrc" alt="" />
    </span>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  name: "LikeBtn",
  components: {},
  props: {
    videoId: String,
  },
  data: function() {
    return {
      db: null,
      isReady: false,
      isActive: false,
    };
  },
  computed: {
    iconImgSrc: function() {
      if (this.isActive) {
        return require("../assets/images/icon-like-active.png");
      }
      return require("../assets/images/icon-like.png");
    },
  },
  mounted: function() {
    this.db = firebase.firestore();
    this.getLike();
  },
  methods: {
    getLike: function() {
      let self = this;
      self.likes = [];
      self.db.collection("like")
        .where("videoId", "==", self.videoId)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length) {
            self.isActive = true;
          }
          self.isReady = true;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
    setLike: function() {
      let self = this;
      self.isReady = false;
      self.db.collection("like")
        .doc()
        .set({
          videoId: this.videoId,
          createdAt: new Date(),
        })
        .then(() => {
          self.isActive = true;
          self.isReady = true;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
    deleteLike: function() {
      let self = this;
      self.isReady = false;
      self.db.collection("like")
        .where("videoId", "==", self.videoId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            self.db.collection("like").doc(doc.id).delete();
            self.isActive = false;
            self.isReady = true;
          });
        });
    },
    toggleLike: function() {
      if (!this.isReady) {
        return false;
      }
      if (this.isActive) {
        this.deleteLike();
        return false;
      }
      this.setLike();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.likeBtn {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px 0 0px 5px;
  cursor: pointer;
  line-height: 60px;
  width: 35px;

  transition: 0.35s;
  img {
    width: 24px;
  }
  &.active {
  }
}
</style>
