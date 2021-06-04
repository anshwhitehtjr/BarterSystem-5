import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBCk2uS57qqzubUBwor5E9zN_2_AnRZuOo",
    authDomain: "barter-system-app---2-8f518.firebaseapp.com",
    databaseURL: "https://barter-system-app---2-8f518.firebaseio.com",
    projectId: "barter-system-app---2-8f518",
    storageBucket: "barter-system-app---2-8f518.appspot.com",
    messagingSenderId: "180632469776",
    appId: "1:180632469776:web:eff2a8e93a1c340b412595"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();