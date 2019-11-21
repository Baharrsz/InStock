import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uuid from "uuid";

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
  const product = props.product;
  return (
    <div className="inventory__Row">
      <div className="inventory__Row-item">
        <Link
          className="inventory__Row-item--name"
          to={`/inventory/${product.id}`}
        >
          {product.name}
        </Link>
        <div className="inventory__Row-item--description">
          {product.description}
        </div>
      </div>
      <div className="inventory__Row-item">{product.date}</div>
      <div className="inventory__Row-item">
        {product.city},{product.country}
      </div>
      <div className="inventory__Row-item"> {product.quantity}</div>
      <div className="inventory__Row-item"> {product.status}</div>
    </div>
  );
}

export default class InventoryMain extends Component {
  state = {
    inventoryList: undefined
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/inventory")
      .then(response => this.setState({ inventoryList: response.data }));
  }

  render() {
    console.log(this.props);
    if (!this.state.inventoryList) return <>Loading...</>;
    else {
      let tableRows = this.state.inventoryList.map(product => {
        return <TableRow product={product} key={uuid()} />;
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
