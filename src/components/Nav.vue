<template>
  <div id="nav">
    <div class="nav_inner">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link>
    </div>
    <a class="signOut" href="#" @click="signOut">SignOut</a>
    <p class="userEmail">
      <span>{{ user.email }}</span
      ><br />としてログイン中
    </p>

    <div class="emailVerified" :class="{ active: isActive }">
      <div class="emailVerified_inner">
        <p class="emailVerified_txt">
          <span>{{ user.email }}</span
          >宛に認証メールを送信しています。<br />
          メール認証を済ませてください。
        </p>
        <p class="emailVerified_sendMail" @click="sendEmailVerified">
          認証メールを再送信
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseAuth from "@/firebase/firebaseAuth";

export default {
  name: "Nav",
  data: function() {
    return {
      isActive: false,
    };
  },
  computed: {
    user: function() {
      return firebaseAuth.getUser();
    },
  },
  mounted: function() {
    if (!firebaseAuth.getEmailVerified()) {
      this.isActive = true;
    }
  },
  methods: {
    signOut: function() {
      let self = this;
      firebaseAuth
        .signOut()
        .then(function() {
          // Sign-out successful.
          alert("サインアウトしました。");
          self.$router.push({ path: "signin" });
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    },
    sendEmailVerified() {
      firebaseAuth.sendEmailVerified();
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
    z-index: 999;
  }
  .userEmail {
    color: #999;
    font-size: 14px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 999;
    text-align: right;
    span {
      color: #42b983;
      text-decoration: underline;
    }
  }
  .emailVerified {
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: none;
    z-index: 998;
    &.active {
      display: block;
    }
    .emailVerified_inner {
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .emailVerified_txt {
      margin-bottom: 20px;
      span {
        text-decoration: underline;
      }
    }
    .emailVerified_sendMail {
      color: #42b983;
      cursor: pointer;
      display: inline-block;
      text-decoration: underline;
      transition: .35s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
