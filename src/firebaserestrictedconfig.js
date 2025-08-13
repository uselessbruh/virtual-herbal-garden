import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "admin-apiKey",
    authDomain: "admin-authDomain",
    projectId: "admin-projectId",
    storageBucket: "admin-storageBucket",
    messagingSenderId: "admin-messagingSenderId",
    appId: "admin-appId"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { db, collection, getDocs, auth, storage };
