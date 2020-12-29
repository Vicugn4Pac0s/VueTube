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
      <commentForm
        :comment="comment"
        @inputted="inputted"
        @send="send"
        @enter="send"
      />
    </div>
  </div>
</template>

<script>
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";

import firestore from '@/firebase/firestore';

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
      firestore
        .collection("comment")
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
      firestore
        .collection("comment")
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
      firestore
        .collection("comment")
        .doc(comment.id)
        .delete();
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.comment {
  background: rgba(255, 255, 255, 0.5);
  width: 280px;
  .comment_body {
    height: 420px;
    position: relative;
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
    &:after {
      content: "Comment";
      color: rgba(255, 255, 255, 0.5);
      font-size: 32px;
      font-weight: bold;
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }
  .comment_list {
    padding: 20px 10px;
    position: relative;
    z-index: 1;
    li {
      margin-bottom: 5px;
    }
  }
}
</style>
