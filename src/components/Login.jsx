import React from "react";
import firebase from "../firebase";
import gdsc_logo_text from "../assets/images/gdsc_logo_text.svg";
import "../assets/css/Login.css";

function Login() {
  const handleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <img src={gdsc_logo_text} alt="logo" />
      <h1>Realtime Chat App</h1>
      <button onClick={handleSignin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
