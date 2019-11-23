import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uuid from "uuid";
import kebabIcon from "../assets/icons/SVG/Icon-kebab-default.svg";
import Create from "./Create";

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

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.showRemove = React.createRef();
  }
  render() {
    const product = this.props.product;
    return (
      <div className="inventory__row">
        <div className="inventory__row-item">
          <Link
            className="inventory__row-item--name"
            to={`/inventory/${product.id}`}
          >
            {product.name}
          </Link>
          <p className="inventory__row-item--description">
            {product.description}
          </p>
        </div>
        <p className="inventory__row-item">{product.date}</p>
        <p className="inventory__row-item">
          {product.city},{product.country}
        </p>
        <p className="inventory__row-item"> {product.quantity}</p>
        <p className="inventory__row-item"> {product.status}</p>
        <img
          className="inventory__row-item"
          src={kebabIcon}
          alt="Remove icon"
          onClick={this.handleKebab}
        />
        <div
          className="inventory__row-dropdown"
          ref={this.showRemove}
          style={{ display: "none" }}
        >
          <button
            className="inventory__row-btn"
            id={product.id}
            onClick={this.props.removeFunction}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  handleKebab = () => {
    let display = this.showRemove.current.style.display;
    display === "none"
      ? (this.showRemove.current.style.display = "block")
      : (this.showRemove.current.style.display = "none");
  };
}

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    // this.overlay = React.createRef();
    this.addPage = React.createRef();
    this.state = {
      inventoryList: undefined,
      // deleted: undefined,
      added: undefined
    };
  }

  render() {
    if (!this.state.inventoryList) return <>Loading...</>;
    else {
      let tableRows = this.state.inventoryList.map(product => {
        return (
          <TableRow
            product={product}
            key={uuid()}
            removeFunction={this.removeProduct}
          />
        );
      });
      return (
        <div className="inventory">
          <h1 className="inventory__title">Inventory</h1>
          <input className="inventory__search" placeholder="search" />
          <div className="inventory__table">
            <TableHeader />
            <div className="inventory__Rows">{tableRows}</div>
            <button className="inventory__btn" onClick={this.showAddPage}>
              +
            </button>
          </div>
          {/* <div
            className="overlay"
            ref={this.overlay}
            style={{ display: "none" }}
          ></div> */}
          <div
            className="addPage"
            ref={this.addPage}
            style={{ display: "none" }}
          >
            <Create addFunction={this.addProduct} />
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/inventory")
      .then(response => this.setState({ inventoryList: response.data }));
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     !prevState.inventoryList ||
  //     prevState.inventoryList.length !== this.state.inventoryList.length
  //   ) {
  //     axios.get("http://localhost:8080/inventory").then(response =>
  //       this.setState({
  //         inventoryList: response.data
  //       })
  //     );
  //   }
  // }

  removeProduct = event => {
    // event.preventDefault();
    const id = event.target.id;
    const url = `http://localhost:8080/inventory/${id}`;
    axios.delete(url).then(
      response => {
        this.setState({ inventoryList: response.data });
      }
      // this.setState(
      //   () => {
      //     // console.log("inside setState", this.state, id);
      //     return { deleted: id };
      //   }
      //   // , console.log(this, this.state, this.state.deleted, id)
      // )
    );
  };

  addProduct = submit => {
    submit.preventDefault();
    const newProduct = {
      name: submit.target.product.value,
      date: submit.target.date.value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      quantity: submit.target.quantity.value,
      status: "instock",
      // submit.target.status.value,
      customer: "user",
      description: submit.target.description.value,
      warehouse: submit.target.warehouse.value
    };
    axios.post("http://localhost:8080/inventory", newProduct).then(response => {
      console.log(response.data);
      this.setState({
        inventoryList: [...this.state.inventoryList, response.data]
      });
    });
    submit.target.reset();
    this.addPage.current.style.display = "none";
  };

  showAddPage = event => {
    event.preventDefault();
    this.addPage.current.style.display = "block";
  };
}
