import React from "react";
import { Link } from "react-router-dom";

import Price from "./Price";
import Image from "./Image";
import cartWhite from "../assets/cartWhite.svg";
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

            const attributes = {};

            this.props.attributes.forEach((attribute) => {
              attributes[attribute.id] = {
                name: attribute.name,
                type: attribute.type,
                selected: attribute.items[0],
              };
            });

            cart.add({
              id: this.props.id,
              brand: this.props.brand,
              name: this.props.name,
              prices: this.props.prices,
              gallery: this.props.gallery,
              amount: 1,
              attributes,
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
