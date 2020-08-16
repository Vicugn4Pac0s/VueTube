<template>
  <div>
    <div>
      <HeadingA>YouTube Search list (Vue.js CLI)</HeadingA>
    </div>
    <br />
    <SearchForm :keyword="keyword" @inputted="inputted" @search="search_video">
      検索
    </SearchForm>
    <YtList :results="results" />
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
      order: "viewCount", // リソースを再生回数の多い順に並べます。
      params: {
        q: "", // 検索クエリを指定します。
        part: "snippet",
        type: "video",
        maxResults: "4", // 最大検索数
        key: "AIzaSyCsi0BGE6nKk0a14F5xZTkVqrGebmJ58Pc",
      },
    };
  },
  props: {},
  created: function() {
    this.search_video();
  },
  methods: {
    search_video: function() {
      this.params.q = this.keyword;
      var self = this;
      axios
        .get("https://www.googleapis.com/youtube/v3/search", {
          params: this.params,
        })
        .then(function(res) {
          self.results = res.data.items;
        });
    },
    inputted: function(event) {
      this.keyword = event.target.value;
    },
  },
};
</script>

<style scoped lang="scss"></style>
