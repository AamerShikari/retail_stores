import React, { useState, useEffect } from "react";
import * as itemAPI from "../../utils/itemAPI";
import { Button, Form, Grid } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header"
import StoreDetails from "../../components/StoreDetails"
import {
    useParams,
  } from "react-router-dom";

export default function MarketPlace(props) {
  const [items, setItems] = useState([]);
    let {id} = useParams();

  async function getItems() {
    try {
      const data = await itemAPI.getFromStore({id: id});
      console.log(data.items, " this is Items");
      setItems([...data.items]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  useEffect(() => {
    getItems();
    console.log(items, "<- HERE THEY ARE");
  }, []);

  return (
    <Grid textAlign="center" style={{ height: "25vh" }} verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={props.handleLogout} user={props.user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 650 }}>
          <StoreDetails items={items}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
