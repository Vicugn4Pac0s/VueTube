<template>
  <div class="signin">
    <InitialForm
      :username="username"
      :password="password"
      @inputtedUsername="inputtedUsername"
      @inputtedPassword="inputtedPassword"
      @submit="signIn"
    >
      <template v-slot:title>Sign In</template>
      <template v-slot:btnTxt>SIGNIN</template>
      <template v-slot:other>
        You don't have an account?
        <router-link to="/signup">create account now!!</router-link>
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
  name: "Signin",
  components: {
    InitialForm,
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
<style scoped lang="scss">
a {
  color: #42b983;
}
.signin {
  margin-top: 60px;
}
</style>
