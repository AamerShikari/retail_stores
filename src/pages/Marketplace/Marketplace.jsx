import React, { useState, useEffect } from "react";
import * as itemAPI from "../../utils/itemAPI";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import ItemDisplay from "../../components/ItemDisplay";

export default function MarketPlace(props) {
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("name", state.name);
    formData.append("price", state.price);
    formData.append("quantity", state.quantity);
    props.handleAddItem(formData);
    console.log("Item CREATED", state);
    // Have to submit the form now! We need a function!
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function getItems() {
    try {
      const data = await itemAPI.getAll();
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
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Form.Input
                className="form-control"
                name="name"
                value={state.name}
                placeholder="Item Name"
                onChange={handleChange}
                required
              />
              <Form.Input
                className="form-control"
                name="price"
                value={state.price}
                placeholder="Item Price"
                onChange={handleChange}
                required
              />
              <Form.Input
                className="form-control"
                name="quantity"
                value={state.quantity}
                placeholder="How many Items?"
                onChange={handleChange}
                required
              />
              <Form.Input
                className="form-control"
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
              <Button type="submit" className="btn">
                Create Store!
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 650 }}>
          <ItemDisplay items={items} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
