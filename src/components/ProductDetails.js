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

    props.data.attributes.forEach((attribute) => {
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
    const data = this.props.data;

    return (
      <div className="product-details">
        <h2 className="title">{data.brand}</h2>
        <h2 className="subtitle">{data.name}</h2>
        <ProductAttributes
          attributes={data.attributes}
          selectedAttributes={this.state.selectedAttributes}
          changeSelection={(attributeId, selected) =>
            this.setState((state) => ({
              selectedAttributes: {
                ...state.selectedAttributes,
                [attributeId]: selected,
              },
            }))
          }
          disabled={!data.inStock}
        />
        <div className="product-price">
          <h3 className="label">price:</h3>
          <Price prices={data.prices} currency={this.props.currency} />
        </div>
        <button
          className={`call-to-action ${data.inStock ? "" : "out-of-stoke"}`}
          disabled={!(this.allAttributesSelected() && data.inStock)}
          onClick={() =>
            cart.add({
              item: data,
              amount: 1,
              selectedAttributes: { ...this.state.selectedAttributes },
            })
          }
        >
          {data.inStock ? "add to cart" : "out of stock"}
        </button>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.description),
          }}
        />
      </div>
    );
  }
}

export default ProductDetails;
