import React, { Component } from "react";
import LocationDetail from "./subcomponents/locationDetail";
import Search from "../assets/icons/SVG/Icon-search.svg";

export default class Locations extends Component {
  state = { location: "warehouse" };
  render() {
    return (
      <div className="location">
        <div className="location__header">
          <div className="location__title">Locations</div>
          <div className="location__search">
            <img
              className="location__search--icon"
              alt="location search icon"
              src={Search}
            ></img>
            <textarea
              className="location__search--input"
              name="search"
              placeholder="Search"
            ></textarea>
          </div>
        </div>
        <div className="location__label">
          <div className="location__label-warehouse">WAREHOUSE</div>
          <div className="location__label-contact">CONTACT</div>
          <div className="location__label-info">CONTACT INFORMATION</div>
          <div className="location__label-cate">CATEGORIES</div>
        </div>
        <div className="location__content">
          <LocationDetail />
        </div>
      </div>
    );
  }
}
