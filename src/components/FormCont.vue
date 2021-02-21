<template>
  <div class="formCont">
    <div class="formCont_inner">
      <h2 class="formCont_ttl">
        <slot name="title"></slot>
      </h2>
      <input
        type="text"
        placeholder="Username"
        :value="username"
        @keyup="$emit('inputtedUsername', $event)"
        @blur="$emit('inputtedUsername', $event)"
      />
      <input
        type="password"
        placeholder="Password"
        :value="password"
        @keyup="$emit('inputtedPassword', $event)"
        @blur="$emit('inputtedPassword', $event)"
        @keydown.enter="$emit('submit', $event)"
      />
      <button @click="$emit('submit', $event)" class="formCont_submit">
        <slot name="btnTxt"></slot>
      </button>
      <p>
        <slot name="other"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCont",
  components: {},
  data: function() {
    return {};
  },
  props: {
    username: String,
    password: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.formCont {
  background: #f9f9f9;
  box-sizing: border-box;
  padding: 40px;
  margin: 0 auto;
  max-width: 450px;
  input {
    background: #fff;
    display: block;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
  }
  .formCont_ttl {
    color: #42b983;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .formCont_submit {
    background: #42b983;
    border: none;
    color: #fff;
    cursor: pointer;
    height: 50px;
    font-family: "Open Sans", sans-serif;
    font-size: 1.2em;
    margin-bottom: 10px;
    letter-spacing: 0.05em;
    text-align: center;
    text-transform: uppercase;
    transition: background 0.3s ease-in-out;
    width: 100%;
  }
}
</style>
