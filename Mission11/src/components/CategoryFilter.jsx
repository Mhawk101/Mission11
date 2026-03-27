import React from 'react';

//filters by category of books.
function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <div className="filter-sidebar mb-4">
      <h3>Filter by Category</h3>

      {/* displays checkbox for each category that exists in the database that can be used for filtering*/}
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