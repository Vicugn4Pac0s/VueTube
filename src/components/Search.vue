<template>

  <div class="search">
    <input size="40" :value="keyword" @input="$emit('input', $event)" placeholder="検索キーワードを入力" />
    <button @click="$emit('click', $event)"><slot /></button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    keyword: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {

}
</style>
