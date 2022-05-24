import React, { useState, useEffect } from "react";
import * as storeAPI from "../../utils/storeAPI";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import StoreDisplay from "../../components/StoreDisplay";
import PageHeader from "../../components/Header/Header";

export default function Stores(props) {
  const [stores, setStores] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("name", state.name);
    props.handleAddStore(formData);
    console.log("STORE CREATED", state);
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

  async function getStores() {
    try {
      const data = await storeAPI.getAll();
      console.log(data.stores, " this is stores");
      setStores([...data.stores]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }

  useEffect(() => {
    getStores();
    console.log(stores, "<- HERE THEY ARE");
  }, []);

  return (
    <Grid textAlign="center" style={{ height: "25vh" }} verticalAlign="middle">
      <Grid.Row>
          <Grid.Column>
              <PageHeader handleLogout={props.handleLogout} user={props.user}/>
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Form.Input
                className="form-control"
                name="name"
                value={state.name}
                placeholder="What's Your New Store Name?"
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
          <StoreDisplay stores={stores} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
