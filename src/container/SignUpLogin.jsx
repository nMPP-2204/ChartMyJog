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

import VideoPlayerBackground from "../component/Video/VideoPlayerBackground";
import Footer from "../component/Footer.jsx";
import ButtonWrapperTransparent from "../component/Button/ButtonWrapperTransparent.jsx";

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
        <VideoPlayerBackground
          video="sea-background.mp4"
          videoPhone="sea-phone-background.mp4"
          posterPhoneURL="/images/sea-phone-background.webp"
          posterURL="/images/sea-background.webp"
        />
        <SignOutBox>
          <UserInfo user={user} />
          <SignOutBtn logout={logout} />
          <StartRunBtn />
        </SignOutBox>

        <Footer />
      </>
    );
  }

  return (
    <>
      <VideoPlayerBackground
        video="sea-background.mp4"
        videoPhone="sea-phone-background.mp4"
        posterPhoneURL="/images/sea-phone-background.webp"
        posterURL="/images/sea-background.webp"
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
    <div className="flex flex-col px-8 py-10 mx-auto mt-24 mb-40 font-serif text-3xl text-center bg-transparent w-80 rounded-3xl">
      {children}
    </div>
  );
};

const SignOutBtn = ({ logout }) => {
  return (
    <button onClick={logout}>
      <ButtonWrapperTransparent>Log out</ButtonWrapperTransparent>
    </button>
  );
};

const StartRunBtn = () => {
  const styledLink = { textDecoration: "none" };
  return (
    <Link to="/run-tracker" style={styledLink}>
      <ButtonWrapperTransparent>Start Run</ButtonWrapperTransparent>
    </Link>
  );
};

const SignUpBox = () => {
  return (
    <div className="flex flex-col w-full mx-auto mt-12 text-3xl text-center bg-transparent md:mt-24 title md:text-5xl">
      <p className="mb-4 md:text-white">Chart My Jog</p>
      <div id="firebaseui-auth-container" className="md:pt-36"></div>
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
