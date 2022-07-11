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

export const db = getFirestore(app);

export const createUser = async ({
  username,
  firstName,
  lastName,
  uid,
  photoURL,
}) => {
  try {
    await setDoc(doc(db, "users", username), {
      firstName,
      lastName,
      uid,
      photoURL,
      online: false,
    });
    console.log("User ( ", username, " ) created!");
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

export const getUser = async ({ username }) => {
  try {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("User doesn't exist!");
    }
  } catch (e) {
    console.error("Error finding user: ", e);
  }
};

export const createRun = async ({
  uid,
  distance,
  time,
  polyline,
  comment = "",
}) => {
  try {
    const docRef = await addDoc(collection(db, "runs"), {
      uid,
      distance,
      time,
      polyline,
      comment,
    });
    console.log("Run created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error creating run: ", e);
  }
};

export const getUserRuns = async ({ username }) => {
  try {
    const runs = [];
    const q = query(collection(db, "runs"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      runs.push(doc.data());
    });
    return runs;
  } catch (e) {
    console.error("Error finding user runs: ", e);
  }
};
