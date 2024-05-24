/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function FilterKategori({ categories, onCategoryChange }) {
  return (
    <div className="filter-kategori">
      <h3>Kategori Popular</h3>
      <button onClick={() => onCategoryChange('')}>All</button>
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}

FilterKategori.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default FilterKategori;
