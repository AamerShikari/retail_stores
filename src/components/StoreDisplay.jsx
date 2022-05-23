import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";

export default function StoreDisplay({ stores }) {
  const [store, setStore] = useState();
  const numPerCol = 3;
  function doSomething(){
      
  }
  return (
    <Card.Group itemsPerRow={numPerCol} stackable>
      {stores.map((store) => {
        return (
          <Card key={store._id}>
            <Card.Content onClick={doSomething}>
              <h1>{store.name}</h1>
              <img src={store.photoUrl} width="100px" height="100px" />
              {/* <Image size="tiny"
                            src={store.photoUrl}
                            wrapped ui={false}/> */}
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
          </Card>
        );
      })}
    </Card.Group>
  );
}
