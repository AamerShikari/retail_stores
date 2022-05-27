import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function StoreDetails(props) {
  const numPerCol = 3;

  return (
    <Card.Group itemsPerRow={numPerCol} stackable>
      {props.items.map((item) => {
        return (
          <Card key={item._id}>
            <Link to={"/store/" + item._id}>
              <Card.Content>
                <h1>Name: {item.name}</h1>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <img src={item.photoUrl} width="100px" height="100px" />
              </Card.Content>
            </Link>
          </Card>
        );
      })}
    </Card.Group>
  );
}
