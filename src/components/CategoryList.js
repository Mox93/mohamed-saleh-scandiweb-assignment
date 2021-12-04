import React from "react";
import { Link } from "react-router-dom";

class CategoryList extends React.Component {
  render() {
    return (
      <div className="category-list">
        {this.props.categories.map((category) => {
          return (
            <Link
              className={`element ${
                this.props.selected === category ? "selected" : ""
              }`}
              key={category}
              to={`/products?${this.props.getParams((params) =>
                params.set("category", category)
              )}`}
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
