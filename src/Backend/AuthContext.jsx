import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc,collection,getDocs } from "firebase/firestore";
import { db, storage } from "../Backend/FirebaseConfig/Firebase"
import { auth } from "./FirebaseConfig/Firebase";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const signUp = async (email, password, name) => {
    setUserEmail(email);
    setUserName(name);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      console.log("Sign-up successful:", currentUser);
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = () =>signInWithPopup(auth, new GoogleAuthProvider());
  

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logout = () => signOut(auth);

  const validateImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
          resolve(true);
      };
    });
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  };
  const saveCarData = async (car) => {
    try {
      await setDoc(doc(db, "cars", car.VIN), car);
      toast.success("Car data saved successfully");
    } catch (error) {
      toast.error("Error saving car data: ", error);
    }
  };
  const getAllCars = async () => {
    try {
      const carsCollectionRef = collection(db, "cars");
      const carsSnapshot = await getDocs(carsCollectionRef);
      const carsArray = carsSnapshot.docs.map(doc => doc.data());
      return carsArray;
    } catch (error) {
      console.error("Error fetching car data:", error);
      throw error;
    }
  };

  const getAllblogs = async () => {
    try {
      const blogsCollectionRef = collection(db, "Blogs");
      const blogSnapshot = await getDocs(blogsCollectionRef);
      const blogArray = blogSnapshot.docs.map(doc => doc.data());
      return blogArray;
    } catch (error) {
      console.error("Error fetching Blog data:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        resetPassword,
        logout,
        userEmail,
        userName,
        uploadImage,
        saveCarData,
        validateImage,
        getAllCars,
        getAllblogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
