import React, { Component } from 'react';
import {
    Button
} from 'react-native';

class SubwayPredictions extends Component {
    static navigationOptions = {
        tabBarLabel: 'Notifications'
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go back home"
            />
        );
    }
}

export default SubwayPredictions;
