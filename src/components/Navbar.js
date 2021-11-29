import React from "react";
import CategoryList from "./CategoryList";
import logo from "../assets/logo.svg";
import OptionList from "./OptionList";

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <img className="logo" src={logo} alt="Scandiweb" />
        <CategoryList />
        <OptionList />
      </div>
    );
  }
}

export default Navbar;
