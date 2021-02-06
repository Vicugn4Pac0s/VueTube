<template>
  <div id="nav">
    <div class="nav_inner">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <a class="signOut" href="#" @click="signOut">SignOut</a>
  </div>
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

export default {
  name: "Nav",
  computed: {
    'user': function() {
      return firebaseAuth.getUser();
    }
  },
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
  position: relative;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .signOut {
    border: 2px solid #999;
    color: #999;
    font-size: 14px;
    padding: 2.5px 20px;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translate(0, -50%);
  }
}
</style>
