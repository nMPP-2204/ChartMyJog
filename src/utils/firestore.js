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
  orderBy,
  limit,
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
  name = "",
  comment = "",
  image = "",
  pace = 0,
}) => {
  try {
    const docRef = await addDoc(collection(db, "runs"), {
      uid,
      distance,
      time,
      name,
      comment,
      image,
      startTime: serverTimestamp(),
      pace,
    });
  } catch (e) {
    console.error("Error creating run: ", e);
  }
};

export const getUserRuns = async ({ uid }) => {
  try {
    const runs = [];
    const q = query(
      collection(db, "runs"),
      where("uid", "==", uid),
      orderBy("startTime", "desc")
    );
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
