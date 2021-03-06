import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { Button, Form, Grid, Segment, Dropdown } from "semantic-ui-react";
import PageHeader from "./Header/Header";
import * as itemAPI from "../utils/itemAPI";
import * as CartAPI from "../utils/ShoppingcartAPI";
import { useNavigate } from "react-router-dom";

export default function ItemBuy(props) {
  let { id } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate()
  const [state, setState] = useState({
    id: "",
    quantity: 0,
    item: ""
  });
  const [carts, setCarts] = useState([]);
  const [cartOptions, setCartOptions] = useState([]);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state, "Handle Change State here!");
  }

  const handleDropDown = (event, data) => {
    setState({
      ...state,
      id: data.value.id,
      type: data.value.type,
      item: item._id
    });
  };

  async function handleAddCart(e) {
    e.preventDefault();
    
    try {
        console.log(state, "<- State here!!!!!!");
        const data = await CartAPI.addItem(state);
        console.log(data, "Post Addition")
        setTimeout(() => {  navigate("/marketplace")}, 500);
    } catch (err) {
      console.log(err);
    }
    
  }

  async function getItem() {
    try {
      const data = await itemAPI.findItem({ _id: id });
      setItem(data.item[0]);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadCarts() {
    try {
      const data = await CartAPI.getAll();
      setCarts(data.carts);
    } catch (err) {
      console.log(err);
    }
  }

  function loadCartOptions() {
    let temp = [];
    for (let i = 0; i < carts.length; i++) {
      if (i === 0) {
        temp.push({
          key: carts[i]._id,
          text: "Your Shopping Cart",
          value: { id: carts[i]._id},
        });
      } else {
        temp.push({
          key: carts[i]._id,
          text: carts[i].shop.name,
          value: { id: carts[i]._id},
        });
      }
    }
    setCartOptions(temp);
  }

  useEffect(() => {
    getItem();
    loadCarts();
    loadCartOptions();
  }, [state]);

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <PageHeader handleLogout={props.handleLogout} user={props.user} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Card.Content>
                <h1>Name: {item.name}</h1>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <img src={item.photoUrl} width="100px" height="100px" />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {!item.isPurchased ? 
            <Form autoComplete="off" onSubmit={handleAddCart}>
              <Segment stacked>
                <Dropdown
                  name="id"
                  type="text"
                  onChange={handleDropDown}
                  placeholder="Who is this for?"
                  fluid
                  selection
                  options={cartOptions}
                />
                <Form.Input
                  type="number"
                  name="quantity"
                  placeholder="How Many Do you Want?"
                  value={state.quantity}
                  min="1"
                  max={item.quantity}
                  onChange={handleChange}
                  required
                />
                <Button
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                  className="btn"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            : 
            <h1>Sold Out!</h1>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
