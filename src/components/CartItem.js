import React from "react";

import Price from "./Price";
import AmountController from "./AmountController";
import arrowWhite from "../assets/arrow-white.svg";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  render() {
    return (
      <div className="cart-item">
        <div className="details">
          <h2 className="title brand">{this.props.brand}</h2>
          <h2 className="title name">{this.props.name}</h2>
          <Price prices={this.props.prices} currency={this.props.currency} />
          <div className="selections">
            {Object.keys(this.props.attributes).map((key) => {
              const attribute = this.props.attributes[key];

              return (
                <div
                  className={`element ${attribute.type}`}
                  key={key}
                  data-name-tip={attribute.name}
                >
                  {attribute.type === "swatch" ? (
                    <div
                      style={{ backgroundColor: attribute.selected.value }}
                    ></div>
                  ) : (
                    attribute.selected.displayValue
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="left-side">
          <AmountController {...this.props} />
          <div
            className="image"
            style={{
              backgroundImage: `url(${
                this.props.gallery[this.state.selectedIndex]
              })`,
            }}
          >
            {this.props.gallery.length > 1 && (
              <>
                <button
                  onClick={() =>
                    this.setState((state) => ({
                      selectedIndex:
                        (state.selectedIndex + this.props.gallery.length - 1) %
                        this.props.gallery.length,
                    }))
                  }
                >
                  <img className="previous" src={arrowWhite} alt="previous" />
                </button>
                <button
                  onClick={() =>
                    this.setState((state) => ({
                      selectedIndex:
                        (state.selectedIndex + 1) % this.props.gallery.length,
                    }))
                  }
                >
                  <img className="next" src={arrowWhite} alt="next" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
