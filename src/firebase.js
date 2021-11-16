import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqAEQNPzIaSeGEFkxFg5T97q_Qq7Xrez8',
  authDomain: 'clone-315bf.firebaseapp.com',
  projectId: 'clone-315bf',
  storageBucket: 'clone-315bf.appspot.com',
  messagingSenderId: '1018283263373',
  appId: '1:1018283263373:web:4681d7ed03bd96b28f69c4',
  measurementId: 'G-35PHHW22NG',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
