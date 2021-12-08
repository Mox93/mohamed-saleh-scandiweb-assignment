import React from "react";
import { Link } from "react-router-dom";

import Price from "./Price";
import Image from "./Image";
import cartWhite from "../assets/cart-white.svg";
import { CartContext } from "../context/cart";

class ProductItem extends React.Component {
  static contextType = CartContext;

  render() {
    const cart = this.context;

    return (
      <Link
        className={`product-item ${this.props.inStock ? "" : "out-of-stock"}`}
        to={`/products/${this.props.id}?${this.props.params}`}
      >
        <div className="image">
          <Image src={this.props.gallery[0]} />
        </div>
        <button
          className="cart-icon"
          onClick={(e) => {
            e.preventDefault();

            const selectedAttributes = {};

            this.props.attributes.forEach((attribute) => {
              selectedAttributes[attribute.id] = attribute.items[0];
            });

            cart.add({
              item: this.props,
              amount: 1,
              selectedAttributes,
            });
          }}
        >
          <img src={cartWhite} alt="cart" />
        </button>
        <h3 className="name">{this.props.name}</h3>
        <Price prices={this.props.prices} currency={this.props.currency} />
      </Link>
    );
  }
}

export default ProductItem;
