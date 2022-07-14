import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export const db = getFirestore(app);

export const createUser = async ({ uid, photoURL, displayName, email }) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      photoURL,
      displayName,
      email,
    });
    console.log("User ( ", displayName, " ) created!");
  } catch (e) {
    console.error("Error creating user: ", e);
  }
};

export const getUsers = async () => {
  try {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.id);
      // console.log(doc.id, " => ", doc.data());
    });
    return users;
  } catch (e) {
    console.error("Error finding all user: ", e);
  }
};

export const getUser = async ({ uid }) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("User doesn't exist!");
      return null;
    }
  } catch (e) {
    console.error("Error finding user: ", e);
  }
};

export const createRun = async ({
  uid,
  distance = 0,
  time = "",
  polyline = [],
  comment = "",
  startTime = 0,
  image = "",
}) => {
  try {
    const docRef = await addDoc(collection(db, "runs"), {
      uid,
      distance,
      time,
      polyline,
      comment,
      image,
      startTime: serverTimestamp(),
    });
    console.log("Run created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error creating run: ", e);
  }
};

export const getUserRuns = async ({ uid }) => {
  try {
    const runs = [];
    const q = query(collection(db, "runs"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      runs.push({ id: doc.id, ...doc.data() });
    });
    return runs;
  } catch (e) {
    console.log("Error finding user runs: ", e);
    return null;
  }
};
