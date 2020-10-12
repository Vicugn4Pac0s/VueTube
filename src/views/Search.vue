<template>
  <div>
    <div>
      <HeadingA>YouTube Search list (Vue.js CLI)</HeadingA>
    </div>
    <div class="searchForm_wrap u-mb20">
      <SearchForm
        :keyword="keyword"
        @inputted="inputted"
        @enter="enter"
        @search="search_video"
      >
        検索
      </SearchForm>
    </div>
    <YtList :results="results" :loadYoutube="loadYoutube" />
  </div>
</template>

<script>
import HeadingA from "@/components/HeadingA.vue";
import SearchForm from "@/components/SearchForm.vue";
import YtList from "@/components/YtList.vue";
import axios from "axios";

export default {
  name: "Search",
  components: {
    HeadingA,
    SearchForm,
    YtList,
  },
  data: function() {
    return {
      results: null,
      keyword: "",
      oldKeyword: "-1",
      order: "viewCount", // リソースを再生回数の多い順に並べます。
      params: {
        q: "", // 検索クエリを指定します。
        part: "snippet",
        type: "video",
        maxResults: "20", // 最大検索数
        key: "AIzaSyCsi0BGE6nKk0a14F5xZTkVqrGebmJ58Pc",
      },
      loadYoutube: 0,
    };
  },
  props: {},
  mounted: function() {
    this.search_video();
  },
  methods: {
    search_video: function() {
      if (this.oldKeyword === this.keyword) return;
      this.params.q = this.keyword;
      this.oldKeyword = this.keyword;
      this.loadYoutube = 0;
      let self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params,
        })
        .then(function(res) {
          self.results = res.data.items;
          self.loadYoutube = 1;
        });
      //テスト用コード
      // axios.get("");
      // self.results = require("../assets/yt.json");
      // self.results = self.results.items;
    },
    inputted: function(event) {
      this.keyword = event.target.value;
    },
    enter: function(event) {
      if (event.keyCode !== 13) return;
      this.search_video();
    },
  },
};
</script>

<style scoped lang="scss"></style>
