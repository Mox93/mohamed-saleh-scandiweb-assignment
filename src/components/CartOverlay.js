import React from "react";

import cartIcon from "../assets/cart.svg";
import { CartContext } from "../context/cart";
import CartMenu from "./CartMenu";

class CartOverlay extends React.Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = { menuOpen: false };

    this.buttonRef = React.createRef();
    this.menuRef = React.createRef();
  }

  toggleMenu = () => this.setState((state) => ({ menuOpen: !state.menuOpen }));

  handleClickOutside = (event) => {
    if (
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target) &&
      this.buttonRef.current &&
      !this.buttonRef.current.contains(event.target)
    ) {
      this.setState(() => ({ menuOpen: false }));
    }
  };

  componentDidUpdate() {
    if (this.state.menuOpen) {
      document.addEventListener("mousedown", this.handleClickOutside);
    } else {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    const cart = this.context;
    const totalAmount = cart.totalAmount();

    return (
      <div className="dropdown">
        <button
          className="element"
          ref={this.buttonRef}
          onClick={this.toggleMenu}
        >
          <img src={cartIcon} alt="cart" />
          {totalAmount > 0 && (
            <div className="badge">
              <h3 className="value">{totalAmount}</h3>
            </div>
          )}
        </button>
        {this.state.menuOpen && (
          <CartMenu
            cart={cart}
            menuRef={this.menuRef}
            currency={this.props.currency}
            params={this.props.params}
            close={() => this.setState(() => ({ menuOpen: false }))}
          />
        )}
      </div>
    );
  }
}

export default CartOverlay;
