import React, { useState } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { Card, Image, Form, Button } from "semantic-ui-react";
import * as CartAPI from "../utils/ShoppingcartAPI";


export default function ShoppingcartDisplay({ carts, user}) {
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

  function handleCartPayment(total){
    console.log(total, "RIGHT HERE IS THE TOTAL CALL")
    CartAPI.adjust({total: total, user: user})
  }

  function doSomething() {}

  return (
    <>
  
      {carts.map((cart) => {
        return (
          <>
            <Card.Group itemsPerRow={numPerCol} stackable>
              <Card key={cart._id}>
                <Card.Header>
                  <h1>{getCartName(cart)}</h1>
                </Card.Header>
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
              <Form autoComplete="off" onSubmit={handleCartPayment(getCartTotal(cart))}>
                <Button
                  color="white"
                  fluid
                  size="large"
                  type="submit"
                  className="btn"
                >
                  Settle Up
                </Button>
              </Form>
            </Card.Group>
          </>
        );
      })}
    </>
  );
}
