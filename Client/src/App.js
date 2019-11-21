import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header";
import Locations from "./components/Locations";
import Inventory from "./components/Inventory";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Redirect from="/" exact to="/locations" />
          <Route path="/inventory" component={Inventory} />
          <Route path="/locations" component={Locations} />
        </Switch>
      </>
    );
  }
}

// function App() {
//   return <div className="App"></div>;
// }

// export default App;
