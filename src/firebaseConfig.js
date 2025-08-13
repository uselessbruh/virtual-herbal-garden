import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "general-apiKey",
    authDomain: "general-authDomain",
    projectId: "general-projectId",
    storageBucket: "general-storageBucket",
    messagingSenderId: "general-messagingSenderId",
    appId: "general-appId"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage =getStorage(app)
export { db, collection, getDocs, auth , storage};

