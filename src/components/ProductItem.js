import React from "react";
import { Link } from "react-router-dom";
import cartWhite from "../assets/cartWhite.svg";
import { SettingsContext } from "../context/settings";
import Price from "./Price";

class ProductItem extends React.Component {
  static contextType = SettingsContext;

  render() {
    const settings = this.context;
    const product = this.props.product;
    const price = product.prices.find(
      ({ currency }) => currency === settings.currencies.selected
    ) || { currency: "#", amount: "-" };

    return (
      <Link
        className={`product-item ${product.inStock ? "" : "out-of-stock"}`}
        to={`/products/${product.id}`}
      >
        <div
          className="image"
          style={{ backgroundImage: `url(${product.gallery[0]})` }}
        >
          {product.inStock ? null : <h3 className="message">out of stock</h3>}
        </div>
        <button
          className="cart-icon"
          onClick={(e) => {
            e.preventDefault();
            console.log(product);
          }}
        >
          <img src={cartWhite} alt="cart" />
        </button>
        <h3 className="name">{product.name}</h3>
        <Price data={price} />
      </Link>
    );
  }
}

export default ProductItem;
