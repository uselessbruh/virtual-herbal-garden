import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCf49k1-ZuV8N4parAVFF-fXJhJ9-pcieQ",
    authDomain: "garden-67579.firebaseapp.com",
    projectId: "garden-67579",
    storageBucket: "garden-67579.appspot.com",
    messagingSenderId: "333607444392",
    appId: "1:333607444392:web:c59132938f17f25699c79d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage =getStorage(app)
export { db, collection, getDocs, auth , storage};
