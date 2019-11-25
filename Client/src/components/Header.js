import React, { Component } from "react";
import logo from "../assets/logo/Logo-instock.png";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img className="header-logo" src={logo} alt="logo"></img>
        <div className="header-flex">
          <a className="header__link-inventory">Inventory</a>
          <a className="header__link-locations">Locations</a>
        </div>
      </div>
    );
  }
}
