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

// Create new User in Firestore
export const createUser = async ({ uid, photoURL, displayName, email }) => {
  try {
    // Creates a new user in the users collection with the following properties
    await setDoc(doc(db, "users", uid), {
      uid,
      photoURL,
      displayName,
      email,
    });

    // return true to indicate action success
    return true;
  } catch (e) {
    console.error("Error creating user: ", e);

    // return false to indicate action unsuccessful
    return false;
  }
};

// Get all users from Firestore - Administration purposes
export const getUsers = async () => {
  try {
    const users = [];

    // Get all documents from users collection
    const querySnapshot = await getDocs(collection(db, "users"));

    // Push all the user ID into an array as we only want to get the user ID information
    querySnapshot.forEach((doc) => {
      users.push(doc.id);
    });

    return users;
  } catch (e) {
    console.error("Error finding all user: ", e);
  }
};

// Get specific user information base on user ID
export const getUser = async ({ uid }) => {
  try {
    // Get user information from Firestore base on user's ID
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    // Make sure data exists before returning
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error finding user: ", e);
    return null;
  }
};

// Create a new run once a user clicks save and completes their jog
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

// Get user's jog history - specific to user ID
export const getUserRuns = async ({ uid }) => {
  try {
    const runs = [];
    // Gets all documents specific to the user ID from the runs collection in descending order
    const q = query(
      collection(db, "runs"),
      where("uid", "==", uid),
      orderBy("startTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    // Attach the document ID to the document data object for a more readable object structure
    querySnapshot.forEach((doc) => {
      runs.push({ id: doc.id, ...doc.data() });
    });

    return runs;
  } catch (e) {
    console.log("Error finding user runs: ", e);
    return null;
  }
};
