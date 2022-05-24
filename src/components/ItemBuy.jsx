import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import PageHeader from "./Header/Header"

export default function ItemBuy(props) {
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

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
