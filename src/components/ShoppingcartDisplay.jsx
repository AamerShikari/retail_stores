import React, { useState } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

export default function ShoppingcartDisplay({ carts }) {
  const numPerCol = 1;
  const numPerCols = 3;
  function getCartName(cart) {
    if (cart.shop) {
      return cart.shop.name;
    } else {
      return "Your Shopping Cart";
    }
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
                      <img src={item.photoUrl} width="100px" height="100px" />
                    </Card.Content>
                  </Card>
                );
              })}
            </Card.Group>
          </>
        );
      })}
    </>
  );
}
