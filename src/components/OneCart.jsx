import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Segment, Card } from "semantic-ui-react";
import PageHeader from "./Header/Header";
import { useParams } from "react-router-dom";
import * as CartAPI from "../utils/ShoppingcartAPI";

export default function OneCart(props) {
  const { id } = useParams();
  let [cart, setCart] = useState();
  let isUser = false;
  let numPerCol = 3;

  // function runIncrement(){
  //     increm += 1
  //     console.log(increm)
  // }
  async function findCart(id) {
    const data = await CartAPI.getAll();

    data.carts.forEach((elem) => {
      if (elem._id === id) {
        console.log(cart, "cart print");
        setCart(elem)
      }
    });

  }

  function checkShop() {
    if (cart) {
      isUser = true;
    }
  }

  useEffect(() => {
    findCart(id)

    checkShop();
    console.log(isUser);
  }, []);

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Card.Group itemsPerRow={numPerCol} stackable>
            {/* {carty.items.map((item) => {
              return (
                <Card key={item._id}>
                  <Card.Content>
                    <h1>Name: {item.name}</h1>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <img src={item.photoUrl} width="100px" height="100px" />
                  </Card.Content>
                </Card>
              );
            })} */}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
