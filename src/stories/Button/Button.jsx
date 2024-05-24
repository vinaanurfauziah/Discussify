import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Button component for category filtering
 */
const Button = ({ label, onClick, backgroundColor, size }) => {
  return (
    <button
      type="button"
      className={`button button--${size}`}
      style={backgroundColor ? { backgroundColor } : null}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Button label
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Background color of the button
   */
  backgroundColor: PropTypes.string,
  /**
   * Size of the button
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Button.defaultProps = {
  onClick: undefined,
  backgroundColor: null,
  size: 'medium',
};

export default Button;
