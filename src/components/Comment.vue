<template>
  <div class="comment">
    <div class="comment_inner">
      <commentForm :comment="comment" @inputted="inputted" @send="send" />

      <ul class="comment_list">
        <li v-for="comment in comments" :key="comment.id">
          <CommentList :comment="comment" @close="deleteComment" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";

import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore();
const dbComment = db.collection("comment");

export default {
  name: "Comment",
  components: {
    CommentList,
    CommentForm,
  },
  data: function() {
    return {
      comments: [],
      comment: "",
    };
  },
  props: {
    videoId: String,
  },
  mounted: function() {
    this.getComment();
  },
  methods: {
    getComment: function() {
      this.comments = [];
      dbComment
        .where("videoId", "==", this.videoId)
        .orderBy("updatedAt", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let commentData = {
              id: doc.id,
              data: doc.data(),
            };
            this.comments.push(commentData);
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
    setComment: function() {
      if (this.comment === "") {
        alert("コメントを入力してください。");
        return false;
      }
      dbComment
        .doc()
        .set({
          videoId: this.videoId,
          comment: this.comment,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(() => {
          this.comment = "";
          this.getComment();
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    },
    deleteComment: function(comment) {
      dbComment.doc(comment.id).delete();
      for (let i = 0; i < this.comments.length; i++) {
        let commentId = this.comments[i].id;
        if (commentId == comment.id) {
          this.comments.splice(i, 1);
          break;
        }
      }
    },
    inputted: function(event) {
      this.comment = event.target.value;
    },
    send: function() {
      this.setComment();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.comment {
  .comment_list {
    li {
      margin-bottom: 5px;
    }
  }
}
</style>
