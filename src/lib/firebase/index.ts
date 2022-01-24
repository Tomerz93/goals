// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDoc,
  collection,
  doc,
  writeBatch,
  setDoc,
  getDocs,
  query,
  where,
  limit,
  CollectionReference,
  collectionGroup,
  deleteDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
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

interface Goal {
  userId: string;
  title: string;
  completed: boolean;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

const userCollection = collection(db, COLLECTION_NAMES.USERS);

const goalsCollection = collection(
  db,
  COLLECTION_NAMES.GOALS
) as CollectionReference<Goal>;

const userNameCollections = collection(db, COLLECTION_NAMES.USERNAMES);

const logout = (): Promise<void> => signOut(auth);

const logInWithProvider = async (
  provider = googleAuthProvider
): Promise<void> => {
  await signInWithPopup(auth, provider);
};

const getUserRef = (uid: string) => doc(userCollection, uid);

const getUserByUsername = async (username: string) => {
  const userResult = query(
    userCollection,
    where('username', '==', username),
    limit(1)
  );
  const userDoc = await getDocs(userResult);
  if (!userDoc.empty) {
    return userDoc.docs[0].data();
  }
  return null;
};

interface CollectionKeys {
  [key: string]: string;
}

const COLLECTIONS = {
  [COLLECTION_NAMES.GOALS]: goalsCollection,
  [COLLECTION_NAMES.USERS]: userCollection,
  [COLLECTION_NAMES.COMMENTS]: (goalId: string) =>
    collection(db, COLLECTION_NAMES.GOALS, goalId, COLLECTION_NAMES.COMMENTS),
};
const getCollection = (key: string) => COLLECTIONS[key];

const getGoalsByUser = async (userId: string) => {
  const queryResult = query(goalsCollection, where('userId', '==', userId));
  const goalsDoc = await getDocs(queryResult);
  if (!goalsDoc.empty)
    return goalsDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return null;
};

const getRefIfExists = async (collectionName: string, ref: string) => {
  try {
    const documentRef = doc(db, collectionName, ref);
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      const document = await getDoc(documentRef);
      return {
        ...document?.data(),
        id: document?.id,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const getGoalById = (id: string) => getRefIfExists(COLLECTION_NAMES.GOALS, id);

const getRef = (collectionName: string, ref: string) =>
  doc(db, collectionName, ref);

const getDocById = async (collectionName: string = 'users', userId: string) => {
  try {
    const user = await getRefIfExists(collectionName, userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const addTag = async (
  userId: string,
  categories: Array<CategoryItem> | CategoryItem
) => {
  const categoriesRef = doc(db, COLLECTION_NAMES.USERS, userId);
  try {
    await setDoc(categoriesRef, { categories }, { merge: true });
  } catch (error) {
    return error;
  }
};
const getSubCollectionByUser = async (userId: string) => {
  const categoriesRef = doc(
    db,
    COLLECTION_NAMES.USERS,
    userId,
    COLLECTION_NAMES.CATEGORIES
  );
  const categoriesDoc = await getDoc(categoriesRef);
  if (categoriesDoc.exists()) {
    return categoriesDoc.data();
  }
};

const getCommentsCountForGoal = async (goalId: string) => {
  const commentsCollection = collection(
    db,
    COLLECTION_NAMES.GOALS,
    goalId,
    COLLECTION_NAMES.COMMENTS
  );
  return (await getDocs(query(commentsCollection))).size;
};

const getComments = async (goalId: string) => {
  const commentsCollection = collection(
    db,
    COLLECTION_NAMES.GOALS,
    goalId,
    COLLECTION_NAMES.COMMENTS
  );
  const commentsDoc = await getDocs(query(commentsCollection));
  if (!commentsDoc.empty) {
    return commentsDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }
  return [];
};

const getAllGoals = async () => {
  const queryResult = query(goalsCollection);
  const goals = (await getDocs(queryResult)).docs;
  const goalsWithUsers = [];
  for await (const goal of goals) {
    const user = (await getDoc(doc(userCollection, goal.data().userId))).data();
    const commentsCount = (await getCommentsCountForGoal(goal.id)) || 0;
    goalsWithUsers.push({ ...goal.data(), id: goal.id, user, commentsCount });
  }
  console.log(goalsWithUsers);
  return goalsWithUsers;
};

const getGoalWithUserAndComments = async (goalId: string) => {
  const goal = await getGoalById(goalId);
  const user = await getDocById(COLLECTION_NAMES.USERS, goal.userId);
  const comments = await getComments(goalId);
  // TODO refactor to reduce
  const commentsWithUsers = await Promise.all(
    comments.map(async (comment) => {
      const user = await getDocById(COLLECTION_NAMES.USERS, comment.userId);
      console.log(user);
      return { ...comment, user };
    })
  );
  return { goal, user, comments: commentsWithUsers };
};
const addComment = async (goalId: string, comment: any) => {
  const commentsCollection = collection(
    db,
    COLLECTION_NAMES.GOALS,
    goalId,
    COLLECTION_NAMES.COMMENTS
  );
  const docRef = await addDoc(commentsCollection, comment);
  return docRef.id;
};

const removeComment = async (goalId: string, commentId: string) => {
  const commentsCollection = collection(
    db,
    COLLECTION_NAMES.GOALS,
    goalId,
    COLLECTION_NAMES.COMMENTS
  );
  return await deleteDoc(doc(commentsCollection, commentId));
};

type userData = {
  email: string;
  uid: string;
};

const addGoal = (userId: string, goal: Goal) => {
  const batch = writeBatch(db);
  // batch.set(doc(userCollection, userId), { email: userData.email, id: userData.uid, username }, { merge: true })
  batch.set(doc(goalsCollection), goal, { merge: true });
  batch.commit();
};

const createUser = async (userData: userData, username: string) => {
  const batch = writeBatch(db);
  batch.set(
    doc(userCollection, userData.uid),
    { email: userData.email, id: userData.uid, username },
    { merge: true }
  );
  batch.set(
    doc(userNameCollections, username),
    { userId: userData.uid, username },
    { merge: true }
  );
  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

const updateGoalLikes = async (goalId: string, likes: string[]) => {
  const goal = doc(db, COLLECTION_NAMES.GOALS, goalId);
  await updateDoc(goal, {
    likes: likes,
  });
};

export {
  db,
  auth,
  getUserByUsername,
  logInWithProvider,
  createUser,
  getDocById,
  addTag,
  getRefIfExists,
  doc,
  app,
  logout,
  getSubCollectionByUser,
  getRef,
  getGoalsByUser,
  getGoalById,
  getCollection,
  userCollection,
  getAllGoals,
  getComments,
  getGoalWithUserAndComments,
  addComment,
  removeComment,
  updateGoalLikes,
};
