import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'
import 'firebase/storage'
const config = {
  
  apiKey: "AIzaSyAMW5Fpx3LrFEHimH1sttC7jC74jPsb6ko",
  authDomain: "hatdb-e9019.firebaseapp.com",
  databaseURL: "https://hatdb-e9019.firebaseio.com",
  projectId: "hatdb-e9019",
  storageBucket: "hatdb-e9019.appspot.com",
  messagingSenderId: "124516792249",
  appId: "1:124516792249:web:8c0a54519ec09de1c2a868",
  measurementId: "G-NKPLNQZ9KJ"

};

firebase.initializeApp(config);
export const db = firebase.firestore();

export const storage = firebase.storage();



export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();
if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
return userRef;
};

export const updateUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();
if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
return userRef;
};




export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
