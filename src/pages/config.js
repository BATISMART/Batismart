import firebase from "firebase";
export const config = {
  apiKey: "AIzaSyBgtokQ-sNPfVzJpYrxDPDYP4CHL77mjQs",
  authDomain: "batismart-f0fd7.firebaseapp.com",
  databaseURL: "https://batismart-f0fd7-default-rtdb.firebaseio.com",
  projectId: "batismart-f0fd7",
  storageBucket: "batismart-f0fd7.appspot.com",
  messagingSenderId: "422846222714",
  appId: "1:422846222714:web:4c97dc49e4b8e19b4d86c3",
  measurementId: "G-SB7K79345B"
};
firebase.initializeApp(config);
export const db = firebase.database();
