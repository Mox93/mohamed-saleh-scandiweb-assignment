import React from "react";
import { SettingsContext } from "../context/settings";

class CategoryList extends React.Component {
  static contextType = SettingsContext;

  render() {
    const settings = this.context;

    return (
      <div className="category-list">
        {settings.categories.options.map((category) => (
          <button
            className={`element ${
              settings.categories.selected === category ? "selected" : ""
            }`}
            key={category}
            onClick={() => settings.categories.change(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
}

export default CategoryList;
