import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBL-6579XLhL10ksx8pNTVUGH6bAK956iY",
    authDomain: "quicpic-react.firebaseapp.com",
    projectId: "quicpic-react",
    storageBucket: "quicpic-react.appspot.com",
    messagingSenderId: "506196460764",
    appId: "1:506196460764:web:a8a54d351914b072326019",
    measurementId: "G-85WG94559F"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};


