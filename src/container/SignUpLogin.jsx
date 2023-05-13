import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../utils/firebase.js";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUser, getUser } from "../utils/firestore.js";

import Loader from "../component/Loader/Loader.js";

import { FiLogOut } from "react-icons/fi";
import { FaRunning } from "react-icons/fa";

import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";
import Footer from "../component/Footer.jsx";

const SignUpLogin = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (!loading) {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(auth);
      if (!user) ui.start("#firebaseui-auth-container", uiConfig);
    }
  }, [user, loading]);

  if (error) {
    return (
      <div id="firebaseui-auth-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div id="firebaseui-auth-container">
        <p>Initialising User...</p>
        <Loader />
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
      <>
        <SignOutBox>
          <UserInfo user={user} />
          <SignOutBtn logout={logout} />
          <StartRunBtn />
        </SignOutBox>
        <VideoPlayerBackground video={"shoe-walking-background.mp4"} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <VideoPlayerBackground
        video="sea-background.mp4"
        videoPhone="sea-phone-background.mp4"
      />
      <SignUpBox />

      <Footer />
    </>
  );
};

const UserInfo = ({ user }) => {
  return (
    <>
      <p className="mt-4">Welcome, </p>
      <strong className="my-4 text-4xl italic">{user.email}</strong>
    </>
  );
};

const SignOutBox = ({ children }) => {
  return (
    <div className="flex flex-col px-8 py-10 mx-auto mt-24 mb-40 font-serif text-3xl text-center bg-slate-200 w-80 rounded-3xl">
      {children}
    </div>
  );
};

const SignOutBtn = ({ logout }) => {
  return (
    <button className={"mb-4 bg-red-500 " + buttonStyle} onClick={logout}>
      <FiLogOut className="h-full ml-4" />
      <p className="h-full ml-6">Log out</p>
    </button>
  );
};

const StartRunBtn = () => {
  const styledLink = { textDecoration: "none" };
  return (
    <Link to="/run-tracker" style={styledLink}>
      <button className={"bg-green-500 " + buttonStyle}>
        <FaRunning className="h-full ml-4" />
        <p className="h-full ml-6 no-underline">Start Run</p>
      </button>
    </Link>
  );
};

const SignUpBox = () => {
  return (
    <div className="flex flex-col mx-auto mt-24 text-2xl text-center bg-transparent w-72 rounded-2xl">
      <p className="mt-3">Sign up or Sign in to </p>
      <p className="my-3 text-3xl font-semibold">Chart My Jog</p>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

const buttonStyle =
  "z-10 rounded-full border-black w-64 h-20 p-3 text-4xl font-serif text-white flex flex-nowrap content-center";

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

export default SignUpLogin;
