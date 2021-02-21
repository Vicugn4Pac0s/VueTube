<template>
  <div class="signin">
    <div class="formCont">
      <div class="formCont_inner">
        <h2 class="formCont_ttl">Sign in</h2>
        <input type="text" placeholder="Username" v-model="username" />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          @keydown.enter="signIn"
        />
        <button @click="signIn" class="formCont_submit">Signin</button>
        <p>
          You don't have an account?
          <router-link to="/signup">create account now!!</router-link>
        </p>
      </div>
    </div>
  </div>
  <WaitLayer :isWait="isWait" />
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

import WaitLayer from "@/components/WaitLayer.vue";

export default {
  name: "Signin",
  components: {
    WaitLayer,
  },
  data: function() {
    return {
      username: "",
      password: "",
      isWait: false,
    };
  },
  mounted: function() {
    //ログイン済みの場合 リダイレクト
    firebaseAuth.initRedirect();
  },
  methods: {
    signIn: function() {
      this.isWait = true;
      firebaseAuth.signIn(this.username, this.password).then(
        (user) => {
          this.$router.push("/");
          console.log(user);
          this.isWait = false;
        },
        (err) => {
          alert(err.message);
          this.isWait = false;
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
.signin {
  margin: 60px 0;
}
.formCont {
  background: #f9f9f9;
  box-sizing: border-box;
  padding: 40px;
  margin:  0 auto;
  max-width: 450px;
}
.formCont input {
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
</style>
