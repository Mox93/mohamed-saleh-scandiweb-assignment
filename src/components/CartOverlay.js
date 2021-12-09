import React from "react";
import { Link } from "react-router-dom";

import cartIcon from "../assets/cart.svg";
import { CartContext } from "../context/cart";
import CartItem from "./CartItem";
import Price from "./Price";
import ProductSelections from "./ProductSelections";

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

    return (
      <div className="dropdown">
        <button
          className="element"
          ref={this.buttonRef}
          onClick={this.toggleMenu}
        >
          <img src={cartIcon} alt="cart" />
          {cart.items.length > 0 && (
            <div className="badge">
              <h3 className="value">{cart.totalAmount()}</h3>
            </div>
          )}
        </button>
        {this.state.menuOpen && (
          <div className="cart-menu">
            <div ref={this.menuRef}>
              {cart.items.length > 0 ? (
                <>
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
                        attributesComponent={
                          <ProductSelections
                            selectedAttributes={item.selectedAttributes}
                            attributes={item.attributes}
                          />
                        }
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
                </>
              ) : (
                <h3 className="no-items">No items</h3>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CartOverlay;
