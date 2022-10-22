import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDQ6ABMh9YJKHDF-ylZmKRCk6tu7uzUsVc",
    authDomain: "proto-chat-app-d88df.firebaseapp.com",
    projectId: "proto-chat-app-d88df",
    storageBucket: "proto-chat-app-d88df.appspot.com",
    messagingSenderId: "238671100879",
    appId: "1:238671100879:web:44a2d19a8a5ae45b42f0ba",
    measurementId: "G-YKL5P334DM",
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);