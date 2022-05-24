import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export default function ItemDisplay({ items }) {
  const numPerCol = 3;
  const navigate = useNavigate();

  function handleClick(item){
    // navigate("/marketplace/"+item.name)
  }

  return (
    <Card.Group itemsPerRow={numPerCol} stackable>
      {items.map((item) => {
        return (
          <Card key={item._id}>
            {/* <Link to={"/marketplace/" + item.name}> */}
              <Card.Content onClick={handleClick(item)}>
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
