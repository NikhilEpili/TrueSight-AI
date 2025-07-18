import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVERM2-8BKbxYwW-fOBHCqWGaMcgg9Dlg',
  authDomain: 'truesight-2.firebaseapp.com',
  projectId: 'truesight-2',
  storageBucket: 'truesight-2.firebasestorage.app',
  messagingSenderId: '115914787370',
  appId: '1:115914787370:web:54069b9e857cdb44b99153',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, db, googleProvider, githubProvider }; 