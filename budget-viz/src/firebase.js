import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC1m2dTADm7lfD8rh0emZ-U7bqctkwtutY",
    authDomain: "srobdev-budget.firebaseapp.com",
    databaseURL: "https://srobdev-budget.firebaseio.com",
    projectId: "srobdev-budget",
    storageBucket: "srobdev-budget.appspot.com",
    messagingSenderId: "1089947034294",
    appId: "1:1089947034294:web:181b248b3edcdea0e4fc17",
    measurementId: "G-5H1V9KDWCS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;