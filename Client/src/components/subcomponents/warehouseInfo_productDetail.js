import React, { Component } from "react";
import kebab from "../../assets/icons/SVG/Icon-kebab-default.svg";
import axios from "axios";

var windowWidth = window.innerWidth;
var foundElement = [];
var mobileflag = false;
var tabdeskflag = false;
export default class warehouseInfo_productDetail extends Component {
  state = {
    product: undefined,
    mobile: false,
    tabdesk: false
  };

  componentDidMount() {
    if (!this.state.mobile && windowWidth < 768) {
      this.setState({ mobile: true });
      this.setState({ tabdesk: false });
    } else if (!this.state.tabdesk && windowWidth >= 768) {
      this.setState({ tabdesk: true });
      this.setState({ mobile: false });
    }
    axios.get("http://localhost:8080/locations/productInfo").then(response => {
      console.log(response.data);
      //find the element matches the name : only first one for mobile version

      response.data.map(element => {
        if (element.warehouse === response.data.warehouse) {
          foundElement.push(element);
        }
      });
      let mobileContent = [];
      mobileContent.push(foundElement[0]);
      if (this.state.mobile) {
        this.setState({
          product: mobileContent
        });
      } else {
        this.setState({
          product: foundElement
        });
      }
    });
  }

  componentWillUpdate() {
    window.addEventListener("resize", () => {
      windowWidth = window.innerWidth;
      if (!this.state.mobile && windowWidth < 768) {
        this.setState({ mobile: true });
        this.setState({ tabdesk: false });
      } else if (!this.state.tabdesk && windowWidth >= 768) {
        this.setState({ tabdesk: true });
        this.setState({ mobile: false });
      }
    });

    let mobileContent = [];
    mobileContent.push(foundElement[0]);
    if (this.state.mobile && !mobileflag) {
      mobileflag = true;
      tabdeskflag = false;
      this.setState({
        product: mobileContent
      });
    } else if (this.state.tabdesk && !tabdeskflag) {
      tabdeskflag = true;
      mobileflag = false;
      this.setState({
        product: foundElement
      });
    }
  }

  outputProduct = () => {
    if (this.state.product[0] === undefined) {
      return <div>Product information Loading ... </div>;
    } else {
      console.log(this.state.product);
      return this.state.product.map((element, index) => {
        console.log(element);
        return (
          <div>
            <div className="productDetail" key={index}>
              <div className="productDetail__content">
                <div className="productDetail__left">
                  <div className="productDetail__left-item">
                    <div
                      className={`productDetail__left-item--label item-${index}`}
                    >
                      ITEM
                    </div>
                    <div className="productDetail__left-item--wrapper">
                      <div className="productDetail__left-item--name">
                        {element.name}
                      </div>
                      <div className="productDetail__left-item--description">
                        {element.description}
                      </div>
                    </div>
                  </div>

                  <div className="productDetail__left-date">
                    <div
                      className={`productDetail__left-date--label item-${index}`}
                    >
                      LAST ORDERED
                    </div>
                    <div className="productDetail__left-date--orderDate">
                      {element.date}
                    </div>
                  </div>

                  <div className="productDetail__left-location">
                    <div
                      className={`productDetail__left-location--label item-${index}`}
                    >
                      LOCATION
                    </div>
                    <div className="productDetail__left-location--name">
                      {element.city}
                    </div>
                  </div>

                  <div className="productDetail__left-quantity">
                    <div
                      className={`productDetail__left-quantity--label item-${index}`}
                    >
                      QUANTITY
                    </div>
                    <div className="productDetail__left-quantity--number">
                      {element.quantity}
                    </div>
                  </div>

                  <div className="productDetail__left-status">
                    <div
                      className={`productDetail__left-status--label item-${index}`}
                    >
                      STATUS
                    </div>
                    <div className="productDetail__left-status--state">
                      {element.status}
                    </div>
                  </div>
                </div>
                <div className="productDetail__right">
                  <img
                    className="productDetail__right-icon"
                    alt="edit button"
                    src={kebab}
                  ></img>
                </div>
              </div>
              <hr className="detail-seperater"></hr>
            </div>
          </div>
        );
      });
    }
  };
  render() {
    if (this.state.product === undefined) {
      return <div>Loading ... </div>;
    } else {
      return <div>{this.outputProduct()}</div>;
    }
  }
}
