<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/search">Search</router-link> |
    <a href="#" @click="signOut">SignOut</a>
  </div>
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

export default {
  name: "Nav",
  methods: {
    signOut: function() {
      let self = this;
      firebaseAuth
        .signOut()
        .then(function() {
          // Sign-out successful.
          alert('サインアウトしました。');
          self.$router.push({ path: "signin" });
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
