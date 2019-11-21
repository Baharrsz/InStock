import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TableHeader() {
  return (
    <div className="inventory__tableHeader">
      <div className="inventory__tableHeader-item"> ITEM</div>
      <div className="inventory__tableHeader-item"> LAST ORDERED</div>
      <div className="inventory__tableHeader-item"> LOCATION</div>
      <div className="inventory__tableHeader-item"> QUANTITY</div>
      <div className="inventory__tableHeader-item"> STATUS</div>
    </div>
  );
}

function TableRow(props) {
  return (
    <div className="inventory__Row">
      <div className="inventory__Row-item">
        <Link className="inventory__Row-item--name" to={props.id}>
          {props.name}
        </Link>
        <div className="inventory__Row-item--description">
          {props.description}
        </div>
      </div>
      <div className="inventory__Row-item">{props.date}</div>
      <div className="inventory__Row-item">
        {props.city},{props.country}
      </div>
      <div className="inventory__Row-item"> {props.quantity}</div>
      <div className="inventory__Row-item"> {props.status}</div>
    </div>
  );
}

export default class Inventory extends Component {
  state = {
    inventoryList: undefined
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/inventory")
      .then(response => this.setState({ inventoryList: response.data }));
  }

  render() {
    if (!this.state.inventoryList) return <>Loading...</>;
    else {
      let tableRows = this.state.inventoryList.map(product => {
        return TableRow(product);
      });
      return (
        <div className="inventory__table">
          <TableHeader />
          <div className="inventory__Rows">{tableRows}</div>
        </div>
      );
    }
  }
}
