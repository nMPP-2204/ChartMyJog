import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { auth } from "../utils/firebase.js";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SignUp = () => {
  const uiConfig = {
    signInSuccessUrl: "http://localhost:3000/home",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "https://chartmyjog-8a62d.web.app/dashboard",
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("https://chartmyjog-8a62d.web.app/home");
    },
    // credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  };

  // Initialize the FirebaseUI Widget using Firebase.
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  });

  return (
    <div>
      <div id="firebaseui-auth-container">Please signup or login!</div>
    </div>
  );
};

export default SignUp;
