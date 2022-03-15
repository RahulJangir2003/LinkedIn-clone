import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKo0JyinTyqX2jhogZXrSc0OdOHOGnvac",
  authDomain: "linkedin-clone-474e9.firebaseapp.com",
  projectId: "linkedin-clone-474e9",
  storageBucket: "linkedin-clone-474e9.appspot.com",
  messagingSenderId: "327855077898",
  appId: "1:327855077898:web:787135ab864f1fd7d9bdf3",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;
