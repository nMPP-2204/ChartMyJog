import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { auth } from "../utils/firebase.js";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SignUpLogin = () => {
  const uiConfig = {
    signInSuccessUrl: "http://localhost:3000/home",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://chartmyjog-8a62d.web.app/dashboard",
    privacyPolicyUrl: function () {
      window.location.assign("https://chartmyjog-8a62d.web.app/home");
    },
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  };

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
    console.log(1);
  });

  return (
    <div>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignUpLogin;
