// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDNhu9chXH7x0Xici71v5RJnP7UgAJdquA",

  authDomain: "lmsedu-e5dbc.firebaseapp.com",

  projectId: "lmsedu-e5dbc",

  storageBucket: "lmsedu-e5dbc.appspot.com",

  messagingSenderId: "886180794492",

  appId: "1:886180794492:web:e386950c162120dd7939f9",

  measurementId: "G-DT60T07VG3"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db=getStorage(app)