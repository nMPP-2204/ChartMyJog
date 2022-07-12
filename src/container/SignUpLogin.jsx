import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../utils/firebase.js";
import AllUsers from "../component/AllUsers.jsx";
import {
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../component/Navbar";
import { createUser, getUser } from "../utils/firestore.js";

const SignUpLogin = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  const uiConfig = {
    signInSuccessUrl: "/home",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://chartmyjog-8a62d.web.app/dashboard",
    privacyPolicyUrl: function () {
      window.location.assign("https://chartmyjog-8a62d.web.app/home");
    },
  };

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  // if (loading) {
  //   return (
  //     <div id="firebaseui-auth-container">
  //       <p>Initialising User...</p>
  //     </div>
  //   );
  // }
  if (error) {
    return (
      <div id="firebaseui-auth-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      (async () => {
        const userExist = await getUser(user);
        if (!userExist) await createUser(user);
      })();
    }

    return (
      <div id="firebaseui-auth-container">
        <Navbar />
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignUpLogin;
