import firebase from "@/firebase/firebase";

class firebaseAuth {
  constructor() {
    this.auth = firebase.auth();
    this.state = 0;
    this.events();
  }
  events() {
    let self = this;
    self.auth.onAuthStateChanged((user) => {
      if (user) {
        self.state = 1;
        return;
      }
      self.state = 0;
    });
  }
  getState() {
    return this.state;
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