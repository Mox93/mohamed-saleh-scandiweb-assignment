import React from "react";
import DOMPurify from "dompurify";

import ProductAttributes from "./ProductAttributes";
import Price from "./Price";
import { CartContext } from "../context/cart";

class ProductDetails extends React.Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);

    const selectedAttributes = {};

    props.attributes.forEach((attribute) => {
      selectedAttributes[attribute.id] = null;
    });

    this.state = { selectedAttributes };
  }

  allAttributesSelected() {
    for (let key in this.state.selectedAttributes) {
      if (this.state.selectedAttributes[key] === null) {
        return false;
      }
    }

    return true;
  }

  render() {
    const cart = this.context;

    return (
      <div className="product-details">
        <h2 className="title">{this.props.brand}</h2>
        <h2 className="subtitle">{this.props.name}</h2>
        <div className="attributes">
          {this.props.attributes.map((attribute, index) => (
            <div className="element" key={attribute.id}>
              <h3 className="label">{attribute.name}:</h3>
              <ProductAttributes
                name={`attr${index}`}
                type={attribute.type}
                items={attribute.items}
                selected={this.state.selectedAttributes[attribute.id]}
                changeSelection={(selection) =>
                  this.setState((state) => {
                    const selectedAttributes = { ...state.selectedAttributes };
                    selectedAttributes[attribute.id] = selection;
                    return { selectedAttributes };
                  })
                }
                disabled={!this.props.inStock}
              />
            </div>
          ))}
        </div>
        <div className="product-price">
          <h3 className="label">Price:</h3>
          <Price prices={this.props.prices} currency={this.props.currency} />
        </div>
        <button
          className="call-to-action"
          disabled={!(this.allAttributesSelected() && this.props.inStock)}
          onClick={() =>
            cart.add({
              id: this.props.id,
              brand: this.props.brand,
              name: this.props.name,
              prices: this.props.prices,
              amount: 1,
              selections: this.state.selectedAttributes,
            })
          }
        >
          Add to cart
        </button>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.props.description),
          }}
        />
      </div>
    );
  }
}

export default ProductDetails;
