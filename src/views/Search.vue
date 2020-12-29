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
import Youtube from "@/utilities/youtube";

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
      loadYoutube: 0,
    };
  },
  props: {},
  mounted: function() {
    this.search_video();
  },
  methods: {
    search_video: async function() {
      if (this.oldKeyword === this.keyword) return;
      this.oldKeyword = this.keyword;
      this.loadYoutube = 0;

      let res = await Youtube.search(this.keyword)

      this.results = res.data.items;
      this.loadYoutube = 1;
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
