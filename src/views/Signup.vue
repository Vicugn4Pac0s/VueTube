<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" @keydown.enter="signUp" />
    <button @click="signUp">Register</button>
    <p>
      Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
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
    let self = this;
    //ログイン済みの場合 リダイレクト
    if (firebaseAuth.getUser()) {
      self.$router.push({ path: "/" });
    }
    firebaseAuth.on("login", function() {
      self.$router.push({ path: "/" });
    });
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
  width: 280px;
}
</style>
