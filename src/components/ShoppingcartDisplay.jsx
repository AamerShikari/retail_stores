import React, { useState, useEffect } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { Card, Image, Form, Button } from "semantic-ui-react";
import * as CartAPI from "../utils/ShoppingcartAPI";
import { Link } from "react-router-dom";


export default function ShoppingcartDisplay({ carts, user}) {
  const [shopCarts, setShopCarts] = useState([])
  const numPerCol = 1;
  const numPerCols = 3;

  function getCartName(cart) {
    if (cart.shop) {
      return cart.shop.name;
    } else {
      return "Your Shopping Cart";
    }
  }

  function getCartTotal(cart) {
    let total = 0;
    cart.items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  }

  function handleCartPayment(total, cartName, cart){
    console.log("fuck")
    // console.log(total, "RIGHT HERE IS THE TOTAL CALL")
    // console.log(cartName, "RIGHT HERE IS THE CartName Cart")
    // console.log(cart, "RIGHT HERE IS THE cart value")
    // let userCart = false;
    // if (cartName === "Your Shopping Cart") {
    //   userCart = true;
    // } 
    // CartAPI.adjust({total: total, user: user, cart: cart, isUser: userCart})
  }

  useEffect(() => {

  }, [])

  function doSomething() {}

  return (
    <>
  
      {carts.map((cart) => {
        return (
          <>
            <Card.Group itemsPerRow={numPerCol} stackable>
              <Card key={cart._id}>
                <Link to={"/Shoppingcart/display/" + cart._id}>
                <Card.Header>
                  <h1>{getCartName(cart)}</h1>
                </Card.Header>
                </Link>
              </Card>
            </Card.Group>
            <Card.Group itemsPerRow={numPerCols} stackable>
              {cart.items.map((item) => {
                return (
                  <Card key={item._id}>
                    <Card.Content onClick={doSomething}>
                      <h1>{item.name}</h1>
                      <h3>Quantity: {item.quantity}</h3>
                      <h3>Price: {item.price}</h3>
                      <img src={item.photoUrl} width="100px" height="100px" />
                      <h3>Total: {(item.quantity * item.price).toFixed(2)}</h3>
                    </Card.Content>
                  </Card>
                );
              })}
              <h1>Cart Total: {getCartTotal(cart)} </h1>
              {/* <button key={cart._id} onClick={handleCartPayment(getCartTotal(cart), getCartName(cart), cart)}>Settle</button> */}
            </Card.Group>
          </>
        );
      })}
    </>
  );
}
