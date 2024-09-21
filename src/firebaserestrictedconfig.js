import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAbxMvQBrsUBEFpLvEGy5izLdAE2XECD8w",
    authDomain: "garden-665c8.firebaseapp.com",
    projectId: "garden-665c8",
    storageBucket: "garden-665c8.appspot.com",
    messagingSenderId: "82745677755",
    appId: "1:82745677755:web:3f0d41c9375c52784b169e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)
export { db, collection, getDocs, auth, storage };