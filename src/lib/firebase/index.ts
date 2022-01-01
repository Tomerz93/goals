// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, collection, doc, writeBatch, setDoc, getDocs, query, where, limit } from 'firebase/firestore';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { COLLECTION_NAMES } from './constants';
import { CategoryItem } from '@lib/modals';

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

const userCollection = collection(db, COLLECTION_NAMES.USERS);

const userNameCollections = collection(db, COLLECTION_NAMES.USERNAMES);

export const logout = (): Promise<void> => signOut(auth);

const logInWithProvider = async (provider = googleAuthProvider): Promise<void> => {
  await signInWithPopup(auth, provider);
}

const getUserRef = (uid: string) => doc(userCollection, uid)

const getUserByUsername = async (username: string) => {

  const userResult = query(userCollection, where('username', '==', username), limit(1))
  const userDoc = await getDocs(userResult)
  if (!userDoc.empty) {
    return userDoc.docs[0].data()
  }
  return null
}

const getRefIfExists = async (collectionName: string, ref: string) => {
  try {
    const documentRef = doc(db, collectionName, ref);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const document = await getDoc(documentRef)
      return document?.data()
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}
const getRef = (collectionName: string, ref: string) => doc(db, collectionName, ref)

const getDocById = async (collectionName: string = 'users', userId: string) => {
  try {
    const user = await getRefIfExists(collectionName, userId)
    return user
  } catch (error) {
    throw error
  }
}

const addTag = async (userId: string, categories: Array<CategoryItem> | CategoryItem) => {
  const categoriesRef = doc(db, COLLECTION_NAMES.USERS, userId);
  try {
    await setDoc(categoriesRef, { categories }, { merge: true })
  } catch (error) {
    return error
  }
}
const getSubCollectionByUser = async (userId: string) => {
  const categoriesRef = doc(db, COLLECTION_NAMES.USERS, userId, COLLECTION_NAMES.CATEGORIES);
  const categoriesDoc = await getDoc(categoriesRef)
  if (categoriesDoc.exists()) {
    return categoriesDoc.data()
  }
}

type userData = {
  email: string
  uid: string
}

const createUser = async (userData: userData, username: string) => {
  const batch = writeBatch(db);
  batch.set(doc(userCollection, userData.uid), { email: userData.email, id: userData.uid, username }, { merge: true })
  batch.set(doc(userNameCollections, username), { userId: userData.uid, username }, { merge: true })
  try {
    await batch.commit()
  } catch (error) {
    console.log(error)
  }
}

export { db, auth, getUserByUsername, logInWithProvider, createUser, getDocById, addTag, getRefIfExists, doc, app, getSubCollectionByUser, getRef };
