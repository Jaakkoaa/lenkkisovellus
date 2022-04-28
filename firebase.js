// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCJ5LCnNQH1xse1zwgYiZ5YBFR3i8K-3x0",

  authDomain: "runtracker-bd8d1.firebaseapp.com",

  projectId: "runtracker-bd8d1",

  storageBucket: "runtracker-bd8d1.appspot.com",

  messagingSenderId: "17853479738",

  appId: "1:17853479738:web:6315b6d0d13462e1ed2e03"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)

module.exports = { db, auth }