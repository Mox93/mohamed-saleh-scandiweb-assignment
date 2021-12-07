import React from "react";
import Price from "./Price";
import ImageNotFound from "../assets/image-not-found.svg";

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-item">
        <div className="details">
          <h2 className="title">{this.props.brand}</h2>
          <h2 className="title">{this.props.name}</h2>
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
        <div className="amount">
          <button
            className="element"
            onClick={() =>
              this.props.updateAmount(this.props.uid, this.props.amount + 1)
            }
          >
            +
          </button>
          <h3 className="value">{this.props.amount}</h3>
          <button
            className="element"
            onClick={() =>
              this.props.updateAmount(this.props.uid, this.props.amount - 1)
            }
          >
            -
          </button>
        </div>
        <div
          className="image"
          style={{
            backgroundImage: `url(${this.props.gallery[0]}), url(${ImageNotFound})`,
          }}
        />
      </div>
    );
  }
}

export default CartItem;
