<template>
  <div class="waitLayer" :class="{ active: isWait }">
    <div class="waitLayer_loader">
      <img src="../assets/images/loader.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitLayer",
  props: {
    isWait: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.waitLayer {
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  transition: 0.35s;

  opacity: 0;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  .waitLayer_loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
