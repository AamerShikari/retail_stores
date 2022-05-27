import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function StoreDisplay({ stores }) {
  const [store, setStore] = useState();
  const numPerCol = 3;
  
  return (
    <Card.Group itemsPerRow={numPerCol} stackable>
      {stores.map((store) => {
        return (
          <Card key={store._id}>
            <Link to={"/store/" + store._id}>
              <Card.Content >
                <h1>{store.name}</h1>
                <img src={store.photoUrl} width="100px" height="100px" />
              </Card.Content>
              <Card.Content>
                <Image
                  size="tiny"
                  avatar
                  src={
                    store.user.photoUrl
                      ? store.user.photoUrl
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                  }
                />
                <p>Owner: {store.user.username}</p>
              </Card.Content>
            </Link>
          </Card>
        );
      })}
    </Card.Group>
  );
}
