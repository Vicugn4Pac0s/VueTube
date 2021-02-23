<template>
  <div class="signup">
    <InitialForm
      :username="username"
      :password="password"
      @inputtedUsername="inputtedUsername"
      @inputtedPassword="inputtedPassword"
      @submit="signUp"
    >
      <template v-slot:title>Sign up</template>
      <template v-slot:btnTxt>Register</template>
      <template v-slot:other>
        Do you have an account?
        <router-link to="/signin">sign in now!!</router-link>
      </template>
    </InitialForm>
  </div>
  <WaitLayer :isWait="isWait" />
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

import InitialForm from "@/components/InitialForm.vue";
import WaitLayer from "@/components/WaitLayer.vue";

export default {
  name: "Signup",
  components: {
    InitialForm,
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
    inputtedUsername: function(event) {
      this.username = event.target.value;
    },
    inputtedPassword: function(event) {
      this.password = event.target.value;
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
</style>
