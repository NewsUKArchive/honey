import React from 'react';

const defaultTextSize = 10

const TextComponent = ({children, size}) => {
    const styles = {
        color: calculateColour(size),
        fontSize: `${size || defaultTextSize}px`
    };

    return (
        <div style={styles}>{children}</div>
    )
};

const calculateColour = (multiplier) => {
    multiplier = multiplier > 100
        ? 100
        : multiplier;
    const redStrength = Math.round((multiplier / 100) * 255);
    return `rgb(${redStrength}, 60, 60)`
};

export default TextComponent;
