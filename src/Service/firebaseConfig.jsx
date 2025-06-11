// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7GGGsnCoUqxJnljizQNsKybE2tT4rJII",
  authDomain: "aitravel-39cf9.firebaseapp.com",
  projectId: "aitravel-39cf9",
  storageBucket: "aitravel-39cf9.firebasestorage.app",
  messagingSenderId: "591520789583",
  appId: "1:591520789583:web:8d3232777787b3f1d6a63a",
  measurementId: "G-Y3BV66ETGZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);

