import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import { login, selectUser } from "../features/user/userSlice";
import { auth } from "../firebase";
import Home from "./Home";
import Login from "./Login";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Switch>
      <Route path="/">{user ? <Home /> : <Login />}</Route>
    </Switch>
  );
};

export default App;
