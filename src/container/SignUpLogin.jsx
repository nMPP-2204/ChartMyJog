import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { auth } from "../utils/firebase.js";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Navbar from "../component/Navbar.jsx";
import AllUsers from "../component/AllUsers.jsx";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: "https://chartmyjog-8a62d.web.app/dashboard",
  privacyPolicyUrl: function () {
    window.location.assign("https://chartmyjog-8a62d.web.app/home");
  },
};

const SignUpLogin = () => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div>
      <Navbar />
      <AllUsers />
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignUpLogin;
