import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnjmT8QhJKSP9D0Hju8GcSjNXXGMMPQzA",
  authDomain: "chat-app-gs-5a226.firebaseapp.com",
  projectId: "chat-app-gs-5a226",
  storageBucket: "chat-app-gs-5a226.firebasestorage.app",
  messagingSenderId: "752088537171",
  appId: "1:752088537171:web:854649c25d13a183c6cea6",
};

//initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avater: "",
      bio: "Hey, There i am using Chat App",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

export { signup, login, logout,auth,db };

// const app = initializeApp(firebaseConfig);
