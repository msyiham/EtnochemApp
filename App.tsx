import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from "./src/navigation/index";

const App = () => {
    return (
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    )
}

export default App;