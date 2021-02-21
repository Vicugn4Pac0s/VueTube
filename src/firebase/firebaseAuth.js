import firebase from "@/firebase/firebase";
import observer from "@/utilities/observer";
import router from "@/router"

class firebaseAuth {
  constructor() {
    this.auth = firebase.auth();
    this.user = null;
    this.state = 0;

    this.Observer = new observer();
    this.events();
  }
  on(eventType, callback) {
    switch (eventType) {
      case "login":
        this.Observer.on("login", callback.bind(this));
        break;
      default:
        console.log("Error");
    }
  }
  initRedirect() {
    if (this.getUser()) {
      router.push({ path: "/" });
    }
    this.on("login", function() {
      router.push({ path: "/" });
    });
  }
  events() {
    let self = this;
    self.auth.onAuthStateChanged((user) => {
      if (user) {
        self.user = user;
        self.state = 1;
        self.Observer.trigger("login", { user: user});
        return;
      }
      self.user = null;
      self.state = 0;
    });
  }
  getState() {
    return this.state;
  }
  getUser() {
    return this.user;
  }
  getEmailVerified() {
    return this.user.emailVerified;
  }
  sendEmailVerified() {
    this.auth.currentUser.sendEmailVerification();
  }
  signIn(username, password) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }
  signUp(username, password) {
    return this.auth.createUserWithEmailAndPassword(username, password);
  }
  signOut() {
    return this.auth.signOut();
  }
}

export default new firebaseAuth();
