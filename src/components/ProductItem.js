import React from "react";
import { getCurrencySymbol } from "../utils";
import cartWhite from "../assets/cartWhite.svg";
import { SettingsContext } from "../context/data";

class ProductItem extends React.Component {
  static contextType = SettingsContext;

  render() {
    const settings = this.context;
    const product = this.props.product;
    const price = product.prices.find(
      ({ currency }) => currency === settings.currencies.selected
    ) || { currency: "#", amount: "-" };

    return (
      <div className={`product-item ${product.inStock ? "" : "out-of-stock"}`}>
        <div className="image">
          {product.inStock ? null : <h3 className="message">out of stock</h3>}
          <img src={product.gallery[0]} alt="product" />
        </div>
        <button className="cart-icon">
          <img src={cartWhite} alt="cart" />
        </button>
        <h3 className="name">{product.name}</h3>
        <h3 className="price">{`${getCurrencySymbol(price.currency)} ${
          price.amount
        }`}</h3>
      </div>
    );
  }
}

export default ProductItem;
