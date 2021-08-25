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
  /* const userRef = firestore.doc(`users/128fdashadu`);
  console.log(userRef); */

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  //console.log(snapShot.data());
  /*  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) }); */

  // for random, ID collection - that not exist
  //console.log(firestore.doc('users/128fdashadu'));

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        // displayName: 'Test User',
        // email: 'randomEmail@gmail.com',
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

// Note !! Here we declare the database - moving our "ShopData" to Firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // **** Note !! Here we continue implement - "Moving our ShopData to Firebase"
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    //const newDocRef = collectionRef.doc(obj.title);
    const newDocRef = collectionRef.doc();
    //console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  // batch.commit() = will fire off our batch request - but returns back a promise
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  //console.log(transformedCollection);

  // Note !! after we have actual objects we're getting from our Backend in the shape that
  //    we need to be for our Frontend with the Route and Id,
  //    -> Lets finally convert this into the actual object map that we need to store
  //        inside of our reducer
  //    => So we going to use "reducer" function on our new transform collection array.
  //    --> and what we want to reduce down to - is that final object, so for the second
  //     parameter of our reduce, we're just going to pass in the empty object as
  //     our initial accumulator - then the function will get the accumulator as the first
  //     value and and our collection object at the current iteration as the second

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Note *** Here we implement for Redux-Saga:
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup Google Authentication
//
//****  Note 1 - implement for Redux-Saga - change the below 2 rows of declare "provider" and export the "provider"
//const provider = new firebase.auth.GoogleAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
//auth.signInWithRedirect(provider).catch(() => {});

export default firebase;
