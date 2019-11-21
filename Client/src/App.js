import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header";
import Locations from "./components/Locations";
import Inventory from "./components/Inventory";
import Create from "./components/Create";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Redirect from="/" exact to="/locations" />
          <Route path="/inventory" component={Inventory} />
          <Route path="/locations" component={Locations} />
        </Switch>
      </div>
    );
  }
}

// function App() {
//   return <div className="App"></div>;
// }

// export default App;
