import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBIJdJUGwP-WPisVOE44Du4CLLb5GyHp-M",
  authDomain: "linkedin-clone-6d5f5.firebaseapp.com",
  projectId: "linkedin-clone-6d5f5",
  storageBucket: "linkedin-clone-6d5f5.appspot.com",
  messagingSenderId: "535830004454",
  appId: "1:535830004454:web:97931075df69c1d886b127"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { storage, auth, provider };
export default db;