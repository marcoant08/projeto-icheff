import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

let firebaseConfig = {
  apiKey: "AIzaSyDWR1a-29cWr2ceuSAggZNWlaEEZ0cix8I",
  authDomain: "icheff-679e8.firebaseapp.com",
  databaseURL: "https://icheff-679e8.firebaseio.com",
  projectId: "icheff-679e8",
  storageBucket: "icheff-679e8.appspot.com",
  messagingSenderId: "1080700857734",
  appId: "1:1080700857734:web:c2dbb6583588b79e175007",
  measurementId: "G-21LPD0GZSH",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  //firebase.firestore();
  //firebase.auth();
  //firebase.storage();
}

export default firebase;
