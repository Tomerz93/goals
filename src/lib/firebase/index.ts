// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { COLLECTION_NAMES } from './constants';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore();

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider()

export const logout = (): Promise<void> => signOut(auth);

const logInWithProvider = async (provider = googleAuthProvider): Promise<void> => {
  await signInWithPopup(auth, provider);
}

const userCollection = collection(db, COLLECTION_NAMES.USERS);

const userNameCollections = collection(db, COLLECTION_NAMES.USERNAMES);

const getRefIfExists = async (collectionName: string, ref: string) => {
  try {
    const documentRef = doc(db, collectionName, ref);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const document = await getDoc(documentRef)
      return document?.data()
    }
  } catch (error) {
    throw error
  }
}

const getDocById = async (collectionName: string = 'users', userId: string) => {
  try {
    const user = await getRefIfExists(collectionName, userId)
    return user
  } catch (error) {
    throw error
  }
}

type userData = {
  email: string
  uid: string
}

const createUser = async (userData: userData, username: string) => {
  const batch = writeBatch(db);
  batch.set(doc(userCollection, userData.uid), { email: userData.email, id: userData.uid, username })
  batch.set(doc(userNameCollections, username), { userId: userData.uid, username })
  try {
    await batch.commit()
  } catch (error) {
    console.log(error)
  }
}



export { db, auth, logInWithProvider, createUser, getDocById, getRefIfExists };
