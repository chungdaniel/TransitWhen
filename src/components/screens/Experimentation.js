import React, { Component } from 'react';
import {
    Button,
    View,
    Text
} from 'react-native';
import axios from 'axios';
import * as nextBusAPI from 'api/next_bus/nextBusAPI';

class Experimentation extends Component {
    static navigationOptions = {
        tabBarLabel: 'Home'
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    };

    constructor() {
        super();
        this.state = {
            predictions: '',
            currentTime: ''
        };
    }

    parsePredictions = (predictions) => {
        let concatenatedString = '';
        console.log(predictions.predictions);
        const sketchyObject = predictions.predictions.direction.prediction;
        const dateTime = new Date(parseInt(sketchyObject.epochTime, 10));
        concatenatedString = `${sketchyObject.branch}: Arriving at ${dateTime.toTimeString()}, or in approximately ${sketchyObject.minutes}, or too precise to be accurate: ${Math.floor(sketchyObject.seconds / 60)}:${sketchyObject.seconds % 60}`;
        const currentTime = new Date();

        this.setState({ predictions: concatenatedString, currentTime: currentTime.toTimeString() });
    };

    render() {
        return (
            <View>
                <Button
                    onPress={() => {
                        nextBusAPI.singleStopPredictionsByStopId(4876)
                            .then((res) => {
                                this.parsePredictions(res.data);
                            });
                    }}
                    title="Woah babel is lit!"
                />
                <Text>
                    {this.state.predictions}
                </Text>
                <Text>
                    {this.state.currentTime}
                </Text>
            </View>
        );
    }
}

export default Experimentation;
