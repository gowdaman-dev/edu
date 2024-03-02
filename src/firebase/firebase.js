// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,


  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,

  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL:process.env.DATABASE_URL
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db=getStorage(app)
export const database = getDatabase(app);
