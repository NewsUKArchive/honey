import React from 'react';
import PropTypes from 'prop-types';

const defaultTextSize = 10;

const calculateColour = (number) => {
  const multiplier = number > 100
    ? 100
    : number;
  const redStrength = Math.round((multiplier / 100) * 255);
  return `rgb(${redStrength}, 60, 60)`;
};

const TextComponent = ({ text, size }) => {
  const styles = {
    color: calculateColour(size),
    fontSize: `${size || defaultTextSize}px`,
  };

  return (
    <div style={styles}>{text}</div>
  );
};

TextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default TextComponent;
