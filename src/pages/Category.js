import React from "react";
import ProductItem from "../components/ProductItem";
import { SettingsContext } from "../context/data";
import { fetchProducts } from "../utils/requests";

class Category extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = { category: null, products: [] };
  }

  componentDidMount() {
    const settings = this.context;

    this.setState(() => ({ category: settings.categories.selected }));
  }

  componentDidUpdate() {
    const settings = this.context;

    if (settings.categories.selected !== this.state.category) {
      this.setState(() => ({ category: settings.categories.selected }));
      fetchProducts(settings.categories.selected, {
        success: (products) => {
          this.setState(() => ({ products }));
        },
        error: (err) => console.log(err),
      });
    }
  }

  render() {
    const settings = this.context;

    return (
      <div className="category-page">
        <h1 className="title">{settings.categories.selected}</h1>
        <div className="grid-container">
          {this.state.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
