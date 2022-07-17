import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../utils/firebase.js";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUser, getUser } from "../utils/firestore.js";

const SignUpLogin = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  const uiConfig = {
    signInSuccessUrl: "/signup",
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://chartmyjog-8a62d.web.app/dashboard",
    privacyPolicyUrl: function () {
      window.location.assign("https://chartmyjog-8a62d.web.app/home");
    },
  };

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    if (!user) ui.start("#firebaseui-auth-container", uiConfig);
  }, [user]);

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
      <div className="signout">
        <div id="firebaseui-auth-container">
          <p>Current User: {user.email}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="startRun" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="signin-gif">
        <img
          src="/images/horseRunning.gif"
          alt="horse"
          style={{ width: "65%", height: "auto" }}
        />
      </div>
      <div id="firebaseui-auth-container"></div>
      <div className="signout">You can also sign in with our test account:</div>
      <div className="signout">Email: test@test.com</div>
      <div className="signout">Password: abc123</div>
    </div>
  );
};

export default SignUpLogin;
