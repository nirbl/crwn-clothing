import firebase from 'firebase/app';

// import from 'firebase' just what we need : DB + authentication
import 'firebase/firestore';
import 'firebase/auth';

// api key (from our firebase project 'document')
const config = {
  apiKey: 'AIzaSyCIz6-W_JNM5PioxaLLk5JyHUMtU76mo44',
  authDomain: 'crwn-db-8fbc2.firebaseapp.com',
  projectId: 'crwn-db-8fbc2',
  storageBucket: 'crwn-db-8fbc2.appspot.com',
  messagingSenderId: '759144372166',
  appId: '1:759144372166:web:4281eadacfad63e06144c7',
  measurementId: 'G-JY2WK9LEMB',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).catch(() => {});
//auth.signInWithRedirect(provider).catch(() => {});

export default firebase;
