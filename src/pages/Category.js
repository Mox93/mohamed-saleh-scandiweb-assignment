import React from "react";
import { withRouter } from "react-router-dom";

import ProductItem from "../components/ProductItem";
import { fetchProducts } from "../utils/requests";
import { SettingsContext } from "../context/settings";

class Category extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = { category: "", products: [] };
  }

  handleProducts() {
    const settings = this.context;
    const params = new URLSearchParams(this.props.location.search);
    const category = params.get("category") || settings.category;

    if (this.state.category !== category) {
      // console.log(
      //   `Fetching Product (was: ${this.state.category}, will-be: ${category})`
      // );
      this.setState({ category });
      settings.setCategory(category, true);

      fetchProducts(category, {
        success: (products) => {
          this.setState(() => ({ products }));
        },
        error: (err) => console.log(err),
      });
    }
  }

  componentDidMount() {
    this.handleProducts();
  }

  componentDidUpdate() {
    this.handleProducts();
  }

  render() {
    const settings = this.context;

    return (
      <div className="category-page container">
        <h1 className="title">{this.state.category}</h1>
        <div className="grid-container">
          {this.state.products.map((product) => (
            <ProductItem
              key={product.id}
              {...product}
              params={settings.getParams((params) => params.delete("category"))}
              currency={settings.currency}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Category);
