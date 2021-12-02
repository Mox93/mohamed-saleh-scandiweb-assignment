import React from "react";
import { Link } from "react-router-dom";

class CategoryList extends React.Component {
  render() {
    const params = new URLSearchParams(this.props.params);
    const selected = params.get("category");

    return (
      <div className="category-list">
        {this.props.categories.map((category) => {
          params.set("category", category);

          return (
            <Link
              className={`element ${selected === category ? "selected" : ""}`}
              key={category}
              to={`/products?${params.toString()}`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default CategoryList;
