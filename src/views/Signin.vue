<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" @keydown.enter="signIn" />
    <button @click="signIn">Signin</button>
    <p>
      You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
  <div class="waitLayer"  :class="{ active: isWait }">
    <div class="waitLayer_loader">
      <img src="../assets/images/loader.gif" alt="" />
    </div>
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

.waitLayer {
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  transition: .35s;

  opacity: 0;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: default;
  }
  .waitLayer_loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
