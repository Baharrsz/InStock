import React, { Component } from "react";
import axios from "axios";

export default class InventoryDetails extends Component {
  state = { selectedProduct: undefined };

  componentDidMount() {
    const url = `http://localhost:8080/inventory/${this.props.id}`;
    axios
      .get(url)
      .then(response => this.setState({ selectedProduct: response.data }));
  }

  render() {
    const product = this.state.selectedProduct;
    if (!this.state.selectedProduct) return <>Loading...</>;
    else {
      return (
        <div className="product">
          <h1 className="product__title">{product.name}</h1>
          <div className="product__status">{product.status}</div>

          <div className="product__details">
            <div className="product__description">
              <label className="product__description-lable">
                ITEM DESCRIPTION
              </label>
              <p className="product__description-text">{product.description}</p>
            </div>
            <div className="product__orderedBy">
              <label className="product__orderedBy-lable">ORDERED BY</label>
              <p className="product__orderedBy-text">{product.customer}</p>
            </div>
            <div className="product__lastOrdered">
              <label className="product__lastOrdered-lable">LAST ORDERED</label>
              <p className="product__lastOrdered-text">{product.date}</p>
            </div>
            <div className="product__quantity">
              <label className="product__quantity-lable">QUANTITY</label>
              <p className="product__quantity-text">{product.quantity}</p>
            </div>
            <div className="product__categories">
              <label className="product__categories-lable">CATEGORIES</label>
              <p className="product__categories-text">{product.categories}</p>
            </div>
            <div className="product__reference">
              <label className="product__reference-lable">
                REFERENCE NUMBER
              </label>
              <p className="product__reference-text"></p>
            </div>
            <div className="product__loacation">
              <label className="product__loacation-lable">LOCATION</label>
              <p className="product__loacation-text">
                {product.city}, {product.country}
              </p>
            </div>
            <div className="product__warehouse">
              <label className="product__warehouse-lable">WAREHOUSE NAME</label>
              <p className="product__warehouse-text">{product.warehouse}</p>
            </div>
          </div>
          <button className="product__btn">EDIT</button>
        </div>
      );
    }
  }
}
