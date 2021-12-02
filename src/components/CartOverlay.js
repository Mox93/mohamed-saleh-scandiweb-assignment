import React from "react";

import cart from "../assets/cart.svg";

class CartOverlay extends React.Component {
  render() {
    return (
      <div className="dropdown">
        <button className="element">
          <img src={cart} alt="cart" />
        </button>
      </div>
    );
  }
}

export default CartOverlay;
