import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhlXpdS-hKI5L7lafbS8K3PWVN16BMctw",
  authDomain: "react-native-app-fe160.firebaseapp.com",
  projectId: "react-native-app-fe160",
  storageBucket: "react-native-app-fe160.appspot.com",
  messagingSenderId: "768532748888",
  appId: "1:768532748888:web:6f09d9d13b367013ba882d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
