import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";

export default function ItemDisplay({ items }) {
  const numPerCol = 3;
  function doSomething(){
      
  }
  return (
    <Card.Group itemsPerRow={numPerCol} stackable>
      {items.map((item) => {
        return (
          <Card key={item._id}>
            <Card.Content onClick={doSomething}>
              <h1>Name: {item.name}</h1>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <img src={item.photoUrl} width="100px" height="100px" />
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}
