import React from "react";
import { withRouter } from "react-router-dom";

import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../utils/requests";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: null, products: [] };
  }

  fetchProducts() {
    const params = new URLSearchParams(this.props.location.search);
    const category = params.get("category");

    if (this.state.category !== category) {
      // console.log(
      //   `Fetching Product (was: ${this.state.category}, will-be: ${category})`
      // );
      this.setState({ category });

      fetchProducts(category, {
        success: (products) => {
          this.setState(() => ({ products }));
        },
        error: (err) => console.log(err),
      });
    }
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate() {
    this.fetchProducts();
  }

  render() {
    return (
      <div className="category-page container">
        <h1 className="title">{this.state.category}</h1>
        <div className="grid-container">
          {this.state.products.map((product) => (
            <ProductItem
              key={product.id}
              {...product}
              params={this.props.location.search}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Category);
