<template>
  <div class="searchForm">
    <input size="40" :value="keyword" @input="$emit('inputted', $event)" placeholder="検索キーワードを入力" />
    <button @click="$emit('search', $event)"><slot /></button>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  props: {
    keyword: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.searchForm {

}
</style>
