import React, { Component } from "react";
import axios from "axios";
import Reactswitch from "react-switch";

export default class Create extends Component {
  render() {
    return (
      <form onSubmit={this.props.addFunction} className="create">
        <h1 className="create-title">Create New</h1>

        {/* Last Product name input */}
        <div className="create__container">
          <h4 className="create__container-title silver">PRODUCT</h4>
          <input
            required
            name="product"
            className="create__container-input"
            placeholder="Item Name"
          ></input>
        </div>

        {/* Last Ordered input */}
        <div className="create__container">
          <h4 className="create__container-title silver">LAST ORDERED</h4>
          <input
            required
            name="date"
            className="create__container-input"
            placeholder="yyyy-mm-dd"
          ></input>
        </div>

        {/* Warehouse input */}
        <div className="create__container">
          <h4 className="create__container-title silver">WAREHOUSE</h4>
          <select required name="warehouse" className="create__container-input">
            <option value="0"></option>
            <option value="Warehouse 1">Warehouse 1</option>
          </select>
        </div>

        {/* City input */}
        <div className="create__container">
          <h4 className="create__container-title silver">CITY</h4>
          <input
            required
            name="city"
            className="create__container-input"
            placeholder="City"
          ></input>
        </div>

        {/* Country input */}
        <div className="create__container">
          <h4 className="create__container-title silver">COUNTRY</h4>
          <input
            required
            name="country"
            className="create__container-input"
            placeholder="Canada"
          ></input>
        </div>

        {/* Quantity input */}
        <div className="create__container">
          <h4 className="create__container-title silver">QUANTITY</h4>
          <input
            required
            name="quantity"
            className="create__container-input"
            placeholder="0"
          ></input>
        </div>

        <div className="create__container">
          <h4 className="create__container-title silver">STATUS</h4>
          <div className="create__container-flex">
            <label id="label-black">In Stock</label>
            <Reactswitch />
          </div>
        </div>

        <div className="create__container">
          <h4 className="create__container-title silver">ITEM DESCRIPTION</h4>
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
