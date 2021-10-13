import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/slices/userSlice";
import Login from "./components/Login";
import Home from "./components/Home";
import firebase from "./firebase";
import { useEffect } from "react";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const obj = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL,
        };
        dispatch(login(obj));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div className="app">{user ? <Home /> : <Login />}</div>;
}

export default App;
