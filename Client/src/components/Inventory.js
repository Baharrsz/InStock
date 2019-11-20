import React, { Component } from "react";
import axios from "axios";

export default class Inventory extends Component {
  state = {
    inventoryList: undefined
  };
  componentDidMount() {
    axios
      .get("localhost:8080/inventory")
      .then(response => this.setState({ inventoryList: response.data }));
  }

  render() {
    if (!this.state.inventoryList) return <>Loading...</>;
    else {
      let tableRows = this.state.inventoryList.map(product => {
        return (
          <ul className="inventory__tableRow">
            <li className="inventory__tableRow-item">
              <div className="inventory__tableRow-item--name">
                {product.name}
              </div>
              <div className="inventory__tableRow-item--description">
                {product.description}
              </div>
            </li>
            <li className="inventory__tableRow-item">{product.date}</li>
            <li className="inventory__tableRow-item">
              {" "}
              {product.city},{product.country}
            </li>
            <li className="inventory__tableRow-item"> {product.quantity}</li>
            <li className="inventory__tableRow-item"> {product.status}</li>
          </ul>
        );
      });
      return (
        <div className="inventory">
          <ul className="inventory__tableHeader">
            <li className="inventory__tableHeader-item"> ITEM</li>
            <li className="inventory__tableHeader-item"> LAST ORDERED</li>
            <li className="inventory__tableHeader-item"> LOCATION</li>
            <li className="inventory__tableHeader-item"> QUANTITY</li>
            <li className="inventory__tableHeader-item"> STATUS</li>
          </ul>
          <div className="inventory__normalRows">{tableRows}</div>
        </div>
      );
    }
  }
}
