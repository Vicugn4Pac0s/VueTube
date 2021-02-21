<template>
  <div class="signup">
    <div class="formCont">
      <div class="formCont_inner">
        <h2 class="formCont_ttl">Sign up</h2>
        <input type="text" placeholder="Username" v-model="username" />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          @keydown.enter="signUp"
        />
        <button @click="signUp" class="formCont_submit">Register</button>
        <p>
          Do you have an account?
          <router-link to="/signin">sign in now!!</router-link>
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
  name: "Signup",
  components: {
    WaitLayer,
  },
  data() {
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
    signUp: function() {
      this.isWait = true;
      firebaseAuth
        .signUp(this.username, this.password)
        .then((user) => {
          firebaseAuth.sendEmailVerified();
          this.$router.push("/");
          console.log(user);
          this.isWait = false;
        })
        .catch((error) => {
          alert(error.message);
          this.isWait = false;
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.signup {
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
