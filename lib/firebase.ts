// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTyR2waoDNE_6EgOCD-cDQRlcs5HyWf3",
  authDomain: "file-612e3.firebaseapp.com",
  projectId: "file-612e3",
  storageBucket: "file-612e3.appspot.com",
  messagingSenderId: "61791378211",
  appId: "1:617913782112:web:98c8baa436d44754049805",
  measurementId: "G-V681QYLQ5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
