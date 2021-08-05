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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // for random, ID collection - that not exist
  //const userRef = firestore.doc('users/128fdashadu');

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //console.log(snapShot);

  // for random, ID collection - that not exist
  //console.log(firestore.doc('users/128fdashadu'));

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
//auth.signInWithRedirect(provider).catch(() => {});

export default firebase;
