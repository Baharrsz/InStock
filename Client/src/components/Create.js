import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
  uploadSubmit = submit => {
    axios.post("http://localhost:8080/inventory", {
      product: submit.target.product.value,
      date: submit.target.date.value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      quantity: submit.target.quantity.value,
      status: submit.target.status.value,
      description: submit.target.description.value
    });
    submit.target.reset();
  };
  render() {
    return (
      <form onSubmit={this.uploadSubmit} className="create">
        <h1 className="create-title">CREATE NEW</h1>

        {/* Last Product name input */}
        <div className="create__container">
          <h4 className="create__container-title">PRODUCT</h4>
          <input
            required
            name="product"
            className="create__container-input"
            placeholder="Item Name"
          ></input>
        </div>

        {/* Last Ordered input */}
        <div className="create__container">
          <h4 className="create__container-title">LAST ORDERED</h4>
          <input
            required
            name="date"
            className="create__container-input"
            placeholder="yyyy-mm-dd"
          ></input>
        </div>

        {/* Warehouse input */}
        <div className="create__container">
          <h4 className="create__container-title">WAREHOUSE</h4>
          <input
            required
            name="warehouse"
            className="create__container-input"
            placeholder="Warehouse"
          ></input>
        </div>

        {/* City input */}
        <div className="create__container">
          <h4 className="create__container-title">CITY</h4>
          <input
            required
            name="city"
            className="create__container-input"
            placeholder="City"
          ></input>
        </div>

        {/* Country input */}
        <div className="create__container">
          <h4 className="create__container-title">COUNTRY</h4>
          <input
            required
            name="country"
            className="create__container-input"
            placeholder="Canada"
          ></input>
        </div>

        {/* Quantity input */}
        <div className="create__container">
          <h4 className="create__container-title">QUANTITY</h4>
          <input
            required
            name="quantity"
            className="create__container-input"
            placeholder="0"
          ></input>
        </div>

        <div className="create__container">
          <h4 className="create__container-title">STATUS</h4>
          <label>In Stock</label>
          <button className="create__container-instock">
            Placeholder for button
          </button>
        </div>

        <div className="create__container">
          <h4 className="create__container-title">ITEM DESCRIPTION</h4>
          <input
            required
            name="description"
            className="create__container-instock optional"
            placeholder="(Optional)"
          ></input>
        </div>
        <div className="create__container">
          <button className="create__container-save">SAVE</button>
          <button
            onClick={this.props.uploadCancel}
            type="button"
            className="create__container-cancel"
          >
            CANCEL
          </button>
        </div>
      </form>
    );
  }
}
