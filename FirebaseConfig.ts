// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHOJOboA2snlb4Z0wSCnP4lQK-048eXvk",
  authDomain: "etnochem-696d8.firebaseapp.com",
  projectId: "etnochem-696d8",
  storageBucket: "etnochem-696d8.appspot.com",
  messagingSenderId: "1005146496821",
  appId: "1:1005146496821:web:8f3a13a6446e991e96f67c",
  measurementId: "G-NHQMHNT6EV"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);