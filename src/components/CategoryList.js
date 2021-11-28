import React from "react";
import { Link } from "react-router-dom";

class CategoryList extends React.Component {
  render() {
    return (
      <div className="category-list">
        {this.props.categories.map((category) => (
          <Link
            className={`element ${
              this.props.selected === category ? "selected" : ""
            }`}
            key={category}
            to={`/categories/${category}`}
          >
            {category}
          </Link>
        ))}
      </div>
    );
  }
}

export default CategoryList;
