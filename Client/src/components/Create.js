import React, { Component } from "react";
import axios from "axios";
import Switch from "react-switch";

export default class Create extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="create-background">
        <form onSubmit={this.uploadSubmit} className="create">
          <h1 className="create-title">Create New</h1>
          <div className="create-flex">
            {/* Last Product name input */}
            <div className="create__container">
              <h4 className="create__container-title silver">PRODUCT</h4>
              <input
                required
                name="name"
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
          </div>

          <div className="create-flex">
            {/* Warehouse input */}
            <div className="create__container">
              <h4 className="create__container-title silver">WAREHOUSE</h4>
              <select
                name="warehouse"
                required
                className="create__container-input"
              >
                <option value="0"></option>
                <option value="0">Warehouse 1</option>
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
          </div>

          <div className="create-flex">
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
          </div>
          <div className="create__container__switch">
            <h4 className="create__container-title silver">STATUS</h4>
            <div className="create__container-flex" id="instock-flex">
              <label id="label-black">In Stock</label>
              <label className="create__container-switch">
                <Switch
                  name="status"
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  onColor="#32cd32"
                  onHandleColor="#ffffff"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                  value={this.state.checked ? "In Stock" : "Out of Stock"}
                />
              </label>
            </div>
          </div>

          <div className="create__container">
            <h4 className="create__container-title silver">ITEM DESCRIPTION</h4>
            <input
              name="description"
              className="create__container-input create__container-input-optional"
              id="optional"
              placeholder="(Optional)"
            ></input>
          </div>
          <div className="create__button">
            <button className="create__button-save">SAVE</button>
            <button
              onClick={this.props.uploadCancel}
              type="button"
              className="create__button-cancel"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }
  handleChange(checked) {
    this.setState({ checked });
    console.log(checked);
    console.log(this.state.checked);
  }
}
