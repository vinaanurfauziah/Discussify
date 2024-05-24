/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const fadeInAnimationsVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
};

function FilterKategori({ categories, onCategoryChange }) {
  return (
    <div className="filter-kategori">
      <h3>Kategori Popular</h3>
      <motion.div>
        <button onClick={() => onCategoryChange('')}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => onCategoryChange(category)}>
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

FilterKategori.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default FilterKategori;
