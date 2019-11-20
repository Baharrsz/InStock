import React, { Component } from "react";
import Arrow from "../../assets/icons/SVG/Icon-arrow-right.svg";
import axios from "axios";

var windowWidth = window.innerWidth;

export default class locationDetail extends Component {
  state = { content: undefined, mobile: false, tabdesk: false };

  componentDidMount() {
    axios.get("http://localhost:8080/locations/content").then(response => {
      this.setState({ content: response.data[0] });
    });
    if (!this.state.mobile && windowWidth < 768) {
      this.setState({ mobile: true });
      this.setState({ tabdesk: false });
    } else if (!this.state.tabdesk && windowWidth >= 768) {
      this.setState({ tabdesk: true });
      this.setState({ mobile: false });
    }
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
  }

  categoryLayout = content => {
    let lineOneContent;
    let lineTwoContent;
    if (this.state.mobile) {
      console.log("Mobile version now");
      lineOneContent =
        content.categories[0] +
        " ," +
        content.categories[1] +
        " ," +
        content.categories[2] +
        " ," +
        content.categories[3];

      lineTwoContent = content.categories[4] + " ," + content.categories[5];
    } else if (this.state.tabdesk) {
      console.log("Tablet and Desktop version now");
      lineOneContent =
        content.categories[0] +
        " ," +
        content.categories[1] +
        " ," +
        content.categories[2];

      lineTwoContent = content.categories[3] + " ," + content.categories[4];
    }
    let lineOne = (
      <div className="location__content-detail--left--categories--lineOne">
        {lineOneContent}
      </div>
    );
    let lineTwo = (
      <div className="location__content-detail--left--categories--lineTwo">
        {lineTwoContent}
      </div>
    );

    return (
      <div className="location__content-detail--left--categories">
        <div className="desktop__title">CATEGORIES</div>
        {lineOne}
        {lineTwo}
      </div>
    );
  };
  render() {
    if (this.state.content === undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="location__content-wrapper">
          <div className="location__content-detail">
            <div className="location__content-detail--left">
              <div className="location__content-detail--left--geo">
                <div className="desktop__title">WAREHOUSE</div>
                <div className="location__content-detail--left--geo--warehouse">
                  {this.state.content.warehouse}
                </div>
                <div className="location__content-detail--left--geo--address">
                  {this.state.content.address}
                </div>
              </div>
              <div className="location__content-detail--left--wrapper">
                <div className="location__content-detail--left--manager">
                  <div className="desktop__title">CONTACT</div>
                  <div className="location__content-detail--left--manager--name">
                    {this.state.content.contact}
                  </div>
                  <div className="location__content-detail--left--manager--role">
                    {this.state.content.role}
                  </div>
                </div>

                <div className="location__content-detail--left--contact">
                  <div className="desktop__title">CONTACT INFORMATION</div>
                  <div className="location__content-detail--left--contact--phone">
                    {this.state.content.phone}
                  </div>
                  <div className="location__content-detail--left--contact--email">
                    {this.state.content.email}
                  </div>
                </div>

                {this.categoryLayout(this.state.content)}
              </div>
            </div>

            <div className="location__content-detail--right">
              <div className="location__content-detail--arrow">
                <img
                  className="location__content-detail--arrow--icon"
                  src={Arrow}
                  alt="Right Arrow"
                ></img>
              </div>
            </div>
          </div>
          <hr className="location__content-seperater"></hr>
        </div>
      );
    }
  }
}
