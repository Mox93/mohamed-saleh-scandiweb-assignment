import React from "react";

import cartIcon from "../assets/cart.svg";
import { CartContext } from "../context/cart";
import CartItem from "./CartItem";

class CartOverlay extends React.Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = { menuOpen: false };
  }

  toggleMenu = () =>
    this.setState((state) => ({
      menuOpen: !state.menuOpen,
    }));

  render() {
    const cart = this.context;

    return (
      <div className="dropdown">
        <button className="element" onClick={this.toggleMenu}>
          <img src={cartIcon} alt="cart" />
          {cart.items.length > 0 && (
            <div className="badge">{cart.items.length}</div>
          )}
        </button>
        {this.state.menuOpen && (
          <div className="cart-menu">
            {cart.items.length > 0 ? (
              <div className="content">
                <h3 className="title">
                  My Bag,
                  <span>
                    {` ${cart.items.length} item${
                      cart.items.length > 1 ? "s" : ""
                    }`}
                  </span>
                </h3>
                {cart.items.map((item) => (
                  <CartItem
                    {...item}
                    key={item.identifier}
                    currency={this.props.currency}
                    updateAmount={cart.updateAmount}
                  />
                ))}
              </div>
            ) : (
              <h3 className="message">No items</h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
