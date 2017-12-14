import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BusPredictions from 'screens/BusPredictions';
import SubwayPredictions from 'screens/SubwayPredictions';
import Experimentation from 'screens/Experimentation';


// For allowing XHR requests to show in the Network tab in Chrome DevTools =)
// IMPORTANT remove following line when running tests
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;


const MyApp = TabNavigator({
    BusPredictions: {
        screen: Experimentation
    },
    Notifications: {
        screen: SubwayPredictions
    },
    Experimentation: {
        screen: BusPredictions
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e91e63'
    }
});

export default MyApp;
