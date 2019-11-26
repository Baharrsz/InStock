import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import arrow from "../../assets/icons/SVG/Icon-back-arrow.svg";
import Switch from "react-switch";

export default class InventoryDetails extends Component {
  constructor(props) {
    super(props);
    this.editBtn = React.createRef();
    this.submitBtn = React.createRef();
    this.cancelBtn = React.createRef();
    this.city = React.createRef();
    this.country = React.createRef();
  }

  state = {
    selectedProduct: undefined,
    disabled: true,
    checked: undefined,
    warehouses: undefined,
    warehouseNames: undefined
  };

  render() {
    const product = this.state.selectedProduct;
    const disabled = this.state.disabled;
    if (!this.state.selectedProduct || !this.state.warehouses)
      return <>Loading...</>;
    else {
      return (
        <form className="product" onSubmit={this.submitEdit}>
          <h1 className="product__title">
            <Link to="/inventory">
              <img src={arrow} alt="Back Arrow" />
            </Link>
            {product.name}
          </h1>

          <div
            className="product__status"
            style={{
              backgroundColor:
                this.state.selectedProduct.status.toUpperCase().indexOf("OUT") <
                0
                  ? "#32cd32"
                  : "#AFAFAF"
            }}
          >
            {product.status}
          </div>
          <input
            className="product__descriptionplus"
            name="descriptionPlus"
            defaultValue={product.descriptionplus}
            disabled={disabled}
          />
          <div className="product__details">
            <div className="product__description">
              <label className="product__description-lable">
                ITEM DESCRIPTION
              </label>
              <input
                className="product__description-text"
                name="description"
                defaultValue={product.description}
                disabled={disabled}
              />
            </div>
            <div className="product__orderedBy">
              <label className="product__orderedBy-lable">ORDERED BY</label>
              <input
                className="product__orderedBy-text"
                name="customer"
                defaultValue={product.customer}
                disabled={disabled}
              />
            </div>
            <div className="product__lastOrdered">
              <label className="product__lastOrdered-lable">LAST ORDERED</label>
              <input
                className="product__lastOrdered-text"
                name="date"
                defaultValue={product.date}
                disabled={disabled}
              />
            </div>
            <div className="product__quantity">
              <label className="product__quantity-lable">QUANTITY</label>
              <input
                className="product__quantity-text"
                name="quantity"
                defaultValue={product.quantity}
                disabled={disabled}
              />
            </div>
            <div className="product__categories">
              <label className="product__categories-lable">CATEGORIES</label>
              <input
                className="product__categories-text"
                name="categories"
                defaultValue={product.categories}
                disabled={disabled}
              />
            </div>
            <div className="product__reference">
              <label className="product__reference-lable">
                REFERENCE NUMBER
              </label>
              <input
                className="product__reference-text"
                name="id"
                defaultValue={product.id}
                disabled={disabled}
              />
            </div>

            <div className="product__warehouse">
              <label className="product__warehouse-lable">WAREHOUSE</label>
              <select
                name="warehouse"
                required
                className="product__warehouse-input"
                onChange={this.populateWarehouse}
                disabled={disabled}
                defaultValue={product.warehouse}
              >
                {this.state.warehouseNames}
              </select>
            </div>

            <div className="product__loacation">
              <label className="product__loacation-lable">LOCATION</label>
              <input
                className="product__loacation-city"
                name="city"
                ref={this.city}
                defaultValue={`${product.city}`}
                disabled
              />
              <input
                className="product__loacation-country"
                name="country"
                ref={this.country}
                defaultValue={`${product.country}`}
                disabled
              />
            </div>
            <label
              className="product__statusSwitch"
              style={{
                visibility: this.state.disabled ? "hidden" : "visible"
              }}
            >
              STATUS
              <span>In Stock</span>
              <Switch
                onChange={this.statusSwitch}
                checked={this.state.checked}
                onColor="#32cd32"
                onHandleColor="#ffffff"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
              />
            </label>
            <div className="product__warehouse">
              <label className="product__warehouse-lable">WAREHOUSE NAME</label>
              <input
                className="product__warehouse-text"
                name="warehouse"
                defaultValue={product.warehouse}
                disabled={disabled}
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
            className="product__btn product__btn--cancel"
            ref={this.cancelBtn}
            type="button"
            style={{ display: "none" }}
            onClick={this.endEdit}
          >
            CANCEL
          </button>
          <button
            className="product__btn"
            ref={this.submitBtn}
            style={{ display: "none" }}
          >
            SAVE
          </button>
        </form>
      );
    }
  }

  componentDidMount() {
    const url = `http://localhost:8080/inventory/${this.props.id}`;
    axios.get(url).then(response => {
      this.setState(
        {
          selectedProduct: response.data,
          checked:
            response.data.status.toUpperCase().indexOf("OUT") < 0 ? true : false
        },
        () => {
          this.getWarehouses();
        }
      );
    });
  }

  statusSwitch = checked => {
    this.setState({ checked });
  };

  startEdit = click => {
    click.preventDefault();
    click.target.style.display = "none";
    this.submitBtn.current.style.display = "inline-block";
    this.cancelBtn.current.style.display = "inline-block";
    this.setState({ disabled: false });
  };

  endEdit = event => {
    event.preventDefault();
    this.editBtn.current.style.display = "block";
    this.submitBtn.current.style.display = "none";
    this.cancelBtn.current.style.display = "none";
    this.setState({ disabled: true });
  };

  submitEdit = submit => {
    submit.preventDefault();
    const status = this.state.checked ? "In Stock" : "Out of Stock";
    const edited = {
      name: this.state.selectedProduct.name,
      description: submit.target.description.value,
      descriptionplus: submit.target.descriptionPlus.value,
      date: submit.target.date.value,
      quantity: submit.target.quantity.value,
      status: status,
      customer: submit.target.customer.value,
      warehouse: submit.target.warehouse[0].value,
      city: submit.target.city.value,
      country: submit.target.country.value,
      id: submit.target.id.value,
      categories: submit.target.categories.value
    };
    axios
      .put(
        `http://localhost:8080/inventory/${this.state.selectedProduct.id}`,
        edited
      )
      .then(response => {
        console.log("response", response);
        this.setState({ selectedProduct: response.data });
      });

    this.endEdit(submit);
  };

  populateWarehouse = select => {
    const selectedWarehouse = select.target.value;

    const warehouseInfo = this.state.warehouses.find(
      location => location.warehouse === selectedWarehouse
    );
    if (warehouseInfo) {
      this.city.current.value = warehouseInfo.city;
      this.country.current.value = warehouseInfo.country;
    } else {
      this.city.current.value = "";
      this.country.current.value = "";
    }
  };

  getWarehouses = () => {
    axios.get("http://localhost:8080/locations/content").then(response => {
      this.setState({ warehouses: response.data }, () => {
        const options = this.state.warehouses.map(warehouse => {
          const selected =
            warehouse.warehouse === this.state.selectedProduct.warehouse;
          return (
            <option
              value={warehouse.warehouse}
              selected={selected}
              id={warehouse.id}
            >
              {warehouse.warehouse}
            </option>
          );
        });
        this.setState({ warehouseNames: options });
      });
    });
  };
}
