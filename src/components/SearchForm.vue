<template>
  <div class="searchForm">
    <input
      size="40"
      class="searchForm_input"
      :value="keyword"
      @keyup="$emit('inputted', $event)"
      @blur="$emit('inputted', $event)"
      @keydown.enter="$emit('enter', $event)"
      placeholder="検索キーワードを入力"
    />
    <button class="searchForm_btn" @click="$emit('search', $event)">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  props: {
    keyword: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.searchForm {
  .searchForm_input {
    font: 15px/24px sans-serif;
    box-sizing: border-box;
    width: 300px;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #aaaaaa;
    border: none;
    border-bottom: 2px solid #1b2538;
    background: transparent;
    margin-right: 0.5em;
  }
  .searchForm_input:focus {
    border-bottom: 2px solid #41B883;
    outline: none;
  }
  .searchForm_btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    appearance: none;

    background: #41B883;
    border: 2px solid #41B883;
    color: #fff;
    padding: 0.3em 1em;
  }
}
</style>
