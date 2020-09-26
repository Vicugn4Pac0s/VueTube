<template>
  <div class="comment" :class="{ active: isActive }">
    <div class="comment_inner">
      <div class="comment_body">
        <ul class="comment_list">
          <li v-for="comment in comments" :key="comment.id">
            <CommentList :comment="comment" @close="deleteComment" />
          </li>
        </ul>
      </div>
      <commentForm :comment="comment" @inputted="inputted" @send="send" />
      <div class="comment_toggle" @click="commentToggle">→</div>
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
      isActive: true,
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
    commentToggle: function() {
      this.isActive = !this.isActive;
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
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  bottom: 0;
  right: 0;
  width: 280px;

  transition: 0.5s;
  transform: translate(280px, 0);
  .comment_body {
    height: 420px;
    overflow-y: scroll;
    /*スクロールバーの横幅指定*/
    &::-webkit-scrollbar {
      width: 5px;
    }
    /*スクロールバーの背景色・角丸指定*/
    &::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
    /*スクロールバーの色・角丸指定*/
    &::-webkit-scrollbar-thumb {
      background: #41b883;
    }
  }
  .comment_list {
    padding: 20px 10px;
    li {
      margin-bottom: 5px;
    }
  }
  .comment_toggle {
    background: #41b883;
    border-radius: 5px 0 0px 5px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    top: 0;
    left: -30px;
    line-height: 50px;
    width: 30px;
  }
  &.active {
    transform: translate(0, 0);
  }
}
</style>
