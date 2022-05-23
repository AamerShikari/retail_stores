import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import Stores from "../AllStore/Store";
import Marketplace from "../Marketplace/Marketplace"
import * as storeAPI from "../../utils/storeAPI"
import * as itemAPI from "../../utils/itemAPI"

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo
  const [stores, setStores] = useState([])
  const [items, setItems] = useState([])

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  async function handleAddStore(store) {
    try {
      const data = await storeAPI.create(store); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddPost");
      setStores([data.store, ...stores]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddItem(item) {
    try {
      const data = await itemAPI.create(item); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddPost");
      setItems([data.item, ...items]);
    } catch (err) {
      console.log(err);
    }
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Stores handleAddStore={handleAddStore} />} />
        <Route path="/marketplace" element={<Marketplace handleAddItem={handleAddItem} />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
