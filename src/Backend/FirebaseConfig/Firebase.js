import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBr0pnQu5MioIk11EwJfOCzks_67Ggmhu",
  authDomain: "car-listing-website.firebaseapp.com",
  projectId: "car-listing-website",
  storageBucket: "car-listing-website.appspot.com",
  messagingSenderId: "1041626908078",
  appId: "1:1041626908078:web:a8ceda8279c01180c63jbhu",
  measurementId: "G-TST2F76VT2"
};
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth,db,storage};
