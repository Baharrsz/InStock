import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import InventoryMain from "./subcomponents/InventoryMain";
import InventoryDetails from "./subcomponents/InventoryDetails";

export default class Inventory extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={InventoryMain} />
        {/* <Route
          path="/:id"
          render={props => {
            return <InventoryDetails id={props.match.params.id} />;
          }}
        /> */}
        <Route path="/:id" component={InventoryDetails} />
      </Switch>
    );
  }
}
