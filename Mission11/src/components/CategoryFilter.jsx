import React from 'react';

function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <div className="filter-sidebar mb-4">
      <h3>Filter by Category</h3>
      {categories.map((categoryName) => (
        <div key={categoryName} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={`filter-${categoryName}`}
            checked={selectedCategories.includes(categoryName)}
            onChange={(e) => onCategoryChange(categoryName, e.target.checked)}
          />
          <label className="form-check-label" htmlFor={`filter-${categoryName}`}>
            {categoryName}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;