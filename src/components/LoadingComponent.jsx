import React from 'react';
import FontAwesome from 'react-fontawesome';
import Center from 'react-center';

const LoadingComponent = () => (
    <Center>
        <FontAwesome name='spinner' size='3x' spin/>
    </Center>
);

export default LoadingComponent;
