<template>
  <h1 class="HeadingA"><slot /></h1>
</template>

<script>
export default {
  name: "HeadingA",
  props: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.HeadingA {
  font-size: 24px;
}
</style>
