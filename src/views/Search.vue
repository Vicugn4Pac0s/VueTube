<template>
  <div>
    <div>
      <font size="6" color="#c71585">YouTube Search list (Vue.js CLI)</font>
    </div>
    <br />
    <SearchForm :keyword="keyword" @inputted="input" @search="search_video">
      検索
    </SearchForm>
    <YtList :results="results" />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import YtList from "@/components/YtList.vue";
import axios from "axios";

export default {
  name: "Search",
  components: {
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
    input: function(event) {
      this.keyword = event.target.value;
    },
  },
};
</script>

<style scoped lang="scss"></style>
