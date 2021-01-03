import Firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCI13WNp1VsiC5pGEekW6mVlOG0AhM6Pzk",
  authDomain: "vue-930db.firebaseapp.com",
  databaseURL: "https://vue-930db.firebaseio.com",
  projectId: "vue-930db",
  storageBucket: "vue-930db.appspot.com",
  messagingSenderId: "943244911729",
  appId: "1:943244911729:web:e0165fe36a2912af85e7d0",
  measurementId: "G-FMH7BHMH7D",
}

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue');

export const firebaseAuth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();