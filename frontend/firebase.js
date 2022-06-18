// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX8k19GlsJw4pFfQkclMnPhWz5s5hP4-A",
  authDomain: "dreamcar-2a2de.firebaseapp.com",
  projectId: "dreamcar-2a2de",
  storageBucket: "dreamcar-2a2de.appspot.com",
  messagingSenderId: "537627640191",
  appId: "1:537627640191:web:0c0f0186a7dd3029539a4a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };