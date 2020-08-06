import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-7EX6xCGn2YmBL9IYT7ZTRvB1x14pbOw",
  authDomain: "jalish-facebook-messenger.firebaseapp.com",
  databaseURL: "https://jalish-facebook-messenger.firebaseio.com",
  projectId: "jalish-facebook-messenger",
  storageBucket: "jalish-facebook-messenger.appspot.com",
  messagingSenderId: "280312891096",
  appId: "1:280312891096:web:28c06f032a193c4da2b9ad",
  measurementId: "G-38BZH06JMP",
});

const db = firebaseApp.firestore();

export default db;
