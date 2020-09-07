
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDtqIUT_m2V32u1JcF-731uS2V48SCM7dg",
    authDomain: "todo-app-yo.firebaseapp.com",
    databaseURL: "https://todo-app-yo.firebaseio.com",
    projectId: "todo-app-yo",
    storageBucket: "todo-app-yo.appspot.com",
    messagingSenderId: "675180702296",
    appId: "1:675180702296:web:7c55111b142855ad18782d",
    measurementId: "G-5K8B0EC3W8"
});

// Firebase has a database : Firestore;
const db = firebase.firestore();

export default db;