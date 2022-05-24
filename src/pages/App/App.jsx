import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import Stores from "../AllStore/Store";
import Marketplace from "../Marketplace/Marketplace";
import ShoppingCart from "../Shoppingcart/Shoppingcart";
import * as storeAPI from "../../utils/storeAPI";
import * as itemAPI from "../../utils/itemAPI";
import * as CartAPI from "../../utils/ShoppingcartAPI";
import ItemBuy from "../../components/ItemBuy";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mong
  const [stores, setStores] = useState([]);
  const [items, setItems] = useState([]);
  const [carts, setCarts] = useState([]);

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
      handleAddCart({shop: data.store})
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

  async function handleAddCart(cart){
    console.log(cart, "THE CART IS BEING CALLED HERE") 
    try {
      const data = await CartAPI.create(cart);
      console.log(data.cart, "this is the cart itself")
      setCarts([data.cart, ...carts])
      console.log(carts)
    } catch (err){
      console.log(err);
    }
  }



  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Stores
              handleAddStore={handleAddStore}
              handleLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route
          path="/marketplace"
          element={
            <Marketplace
              handleAddItem={handleAddItem}
              handleLogout={handleLogout}
              user={user}
            />
          }
        />
        <Route path="/shoppingcart/:username" element={<ShoppingCart user={user} handleLogout={handleLogout}  />} />
        <Route path="/marketplace/:item_name" element={<ItemBuy user={user} handleLogout={handleLogout} />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} handleAddCart={handleAddCart} />}
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
        element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} handleAddCart={handleAddCart}/>}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
