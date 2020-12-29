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

import commentModel from '@/model/comment';

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
    getComment: async function() {
      this.comments = [];
      let data = await commentModel.get(this.videoId)
      data.forEach((doc) => {
        let commentData = {
          id: doc.id,
          data: doc.data(),
        };
        this.comments.push(commentData);
      });
    },
    setComment: async function() {
      if (this.comment === "") {
        alert("コメントを入力してください。");
        return false;
      }
      await commentModel.set(this.videoId, this.comment);

      this.comment = "";
      this.getComment();
    },
    deleteComment: async function(comment) {
      await commentModel.delete(comment.id);
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
