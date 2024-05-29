// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvCaXoW1MitMKkSCcqXFQUBAaWRGuXbkA",
  authDomain: "pinterest-clone-d3164.firebaseapp.com",
  projectId: "pinterest-clone-d3164",
  storageBucket: "pinterest-clone-d3164.appspot.com",
  messagingSenderId: "64330864919",
  appId: "1:64330864919:web:fee610bd7630e3b490ff52",
  measurementId: "G-6K95FFREBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;