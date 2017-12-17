import React, { Component } from 'react';
import {
    Button
} from 'react-native';

class BusPredictions extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home'
        // Note: By seed_data the icon is only shown on iOS. Search the showIcon option below.
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notifications')}
                title="Woah babel is lit!"
            />
        );
    }
}

export default BusPredictions;
