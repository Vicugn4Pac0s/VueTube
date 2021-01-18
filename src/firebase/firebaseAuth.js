import firebase from "@/firebase/firebase";

class firebaseAuth {
  constructor() {
    this.auth = firebase.auth();
    this.user = null;
    this.state = 0;
    this.events();
  }
  events() {
    let self = this;
    self.auth.onAuthStateChanged((user) => {
      if (user) {
        self.user = user;
        self.state = 1;
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