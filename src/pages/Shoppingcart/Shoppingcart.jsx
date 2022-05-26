import React, { useState, useEffect } from "react";
import * as CartAPI from "../../utils/ShoppingcartAPI";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import ShoppingcartDisplay from "../../components/ShoppingcartDisplay";
import PageHeader from "../../components/Header/Header";

export default function ShoppingCart(props) {
  const [carts, setCarts] = useState([]);
  const [state, setState] = useState("");

  async function getCarts() {
    try {
      const data = await CartAPI.getAll();
      console.log(data.carts, " this is carts");
      setCarts([...data.carts]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  useEffect(() => {
    getCarts();
    console.log(carts, "<- HERE THEY ARE");
  }, []);

  return (
    <>
      <Grid
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={props.handleLogout} user={props.user} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <ShoppingcartDisplay carts={carts} user={props.user}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
