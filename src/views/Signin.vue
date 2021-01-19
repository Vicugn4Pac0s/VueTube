<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="signIn">Signin</button>
    <p>
      You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

export default {
  name: "Signin",
  data: function() {
    return {
      username: "",
      password: "",
    };
  },
  mounted: function() {
    let self = this;
    //ログイン済みの場合 リダイレクト
    if (firebaseAuth.getUser()) {
      self.$router.push({ path: "/" });
    }
    firebaseAuth.on("login", function(e) {
      self.$router.push({ path: "/" });
    });
  },
  methods: {
    signIn: function() {
      firebaseAuth.signIn(this.username, this.password).then(
        (user) => {
          alert("Success!");
          this.$router.push("/");
          console.log(user);
        },
        (err) => {
          alert(err.message);
        }
      );
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
.signin {
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
