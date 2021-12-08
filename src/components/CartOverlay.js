import React from "react";
import { Link } from "react-router-dom";

import cartIcon from "../assets/cart.svg";
import { CartContext } from "../context/cart";
import CartItem from "./CartItem";
import Price from "./Price";

class CartOverlay extends React.Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    this.state = { menuOpen: false };

    this.buttonRef = React.createRef();
    this.wrapperRef = React.createRef();
  }

  setWrapperRef = (node) => (this.wrapperRef = node);

  setButtonRef = (node) => (this.buttonRef = node);

  toggleMenu = () => this.setState((state) => ({ menuOpen: !state.menuOpen }));

  handleClickOutside = (event) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.buttonRef &&
      !this.buttonRef.contains(event.target)
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

    return (
      <div className="dropdown">
        <button
          className="element"
          ref={this.setButtonRef}
          onClick={this.toggleMenu}
        >
          <img src={cartIcon} alt="cart" />
          {cart.items.length > 0 && (
            <div className="badge">
              <h3 className="value">{cart.items.length}</h3>
            </div>
          )}
        </button>
        {this.state.menuOpen && (
          <div className="cart-menu">
            {cart.items.length > 0 ? (
              <div ref={this.setWrapperRef}>
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
                      key={item.uid}
                      gallery={[item.gallery[0]]}
                      currency={this.props.currency}
                      updateAmount={cart.updateAmount}
                    />
                  ))}
                </div>
                <div className="summery">
                  <div className="total-price">
                    <h3 className="label">total</h3>
                    <Price
                      prices={cart.totalPrices()}
                      currency={this.props.currency}
                    />
                  </div>
                  <div className="actions">
                    <Link
                      className="view-bag"
                      to={`/cart?${this.props.params}`}
                      onClick={() => this.toggleMenu()}
                    >
                      view bag
                    </Link>
                    <button
                      className="check-out"
                      onClick={() => {
                        this.toggleMenu();
                        alert("WE'VE TAKEN ALL YOUR MONEY MWAHAHAHAHA!!!");
                      }}
                    >
                      check out
                    </button>
                  </div>
                </div>
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
