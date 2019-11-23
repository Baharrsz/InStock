import React, { Component } from "react";
import axios from "axios";

export default class InventoryDetails extends Component {
  constructor(props) {
    super(props);
    this.editBtn = React.createRef();
    this.submitBtn = React.createRef();
    this.cancelBtn = React.createRef();
  }

  state = { selectedProduct: undefined, nonEditMode: true };

  render() {
    const product = this.state.selectedProduct;
    if (!this.state.selectedProduct) return <>Loading...</>;
    else {
      return (
        <form className="product">
          <h1 className="product__title">{product.name}</h1>
          <div className="product__status">{product.status}</div>

          <div className="product__details">
            <div className="product__description">
              <label className="product__description-lable">
                ITEM DESCRIPTION
              </label>
              <input
                className="product__description-text"
                placeholder={product.description}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__orderedBy">
              <label className="product__orderedBy-lable">ORDERED BY</label>
              <input
                className="product__orderedBy-text"
                placeholder={product.customer}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__lastOrdered">
              <label className="product__lastOrdered-lable">LAST ORDERED</label>
              <input
                className="product__lastOrdered-text"
                placeholder={product.date}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__quantity">
              <label className="product__quantity-lable">QUANTITY</label>
              <input
                className="product__quantity-text"
                placeholder={product.quantity}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__categories">
              <label className="product__categories-lable">CATEGORIES</label>
              <input
                className="product__categories-text"
                placeholder={product.categories}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__reference">
              <label className="product__reference-lable">
                REFERENCE NUMBER
              </label>
              <input
                className="product__reference-text"
                placeholder={product.id}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__loacation">
              <label className="product__loacation-lable">LOCATION</label>
              <input
                className="product__loacation-text"
                placeholder={`${product.city}, ${product.country}`}
                disabled={this.state.editMode}
              />
            </div>
            <div className="product__warehouse">
              <label className="product__warehouse-lable">WAREHOUSE NAME</label>
              <input
                className="product__warehouse-text"
                placeholder={product.warehouse}
                disabled={this.state.editMode}
              />
            </div>
          </div>
          <button
            className="product__btn"
            type="button"
            ref={this.editBtn}
            onClick={this.startEdit}
          >
            EDIT
          </button>
          <button
            className="product__btn"
            ref={this.submitBtn}
            style={{ display: "none" }}
            onSubmit={this.endEdit}
          >
            SUBMIT
          </button>
          <button
            className="product__btn"
            ref={this.cancelBtn}
            type="button"
            style={{ display: "none" }}
            onClick={this.endEdit}
          >
            CANCEL
          </button>
        </form>
      );
    }
  }

  componentDidMount() {
    const url = `http://localhost:8080/inventory/${this.props.id}`;
    axios
      .get(url)
      .then(response => this.setState({ selectedProduct: response.data }));
  }

  startEdit = click => {
    click.preventDefault();
    click.target.style.display = "none";
    this.submitBtn.current.style.display = "inline-block";
    this.cancelBtn.current.style.display = "inline-block";
    this.setState({ nonEditMode: false });
  };

  endEdit = event => {
    event.preventDefault();
    this.editBtn.current.style.display = "block";
    this.submitBtn.current.style.display = "none";
    this.cancelBtn.current.style.display = "none";
  };

  submitEdit = submit => {};
}
