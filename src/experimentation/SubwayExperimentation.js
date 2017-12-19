import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    Picker,
    Modal,
    TextInput,
    FlatList
} from 'react-native';
import { stationPredictions } from 'api/ttc/ttcSubwayApi';
// TODO find someway to make this dynamic...
import subwayLines from 'seed_data/20171219_ttc_subway_system.json';
import { window } from '../styling/common';

class Experimentation extends Component {
    static navigationOptions = {
        tabBarLabel: 'SubwayExp'
        // Note: By seed_data the icon is only shown on iOS. Search the showIcon option below.
    };

    constructor() {
        super();
        this.state = {
            predictions: '',
            // selectedLine: {
            //     abbr: '',
            //     id: 0,
            //     name: '',
            //     subwayStations: []
            // },
            selectedLine: subwayLines[0],
            selectedStation: {},
            subwayLines,
            visible: false,
            search: ''
        };
    }

    parsePredictions = (predictions) => {
        const currentTime = new Date();
        let concatenatedString = `The current time is ${currentTime.toLocaleTimeString()}.\n Selected station is ${this.state.selectedStation.name}\n`;
        const { ntasData } = predictions;
        // direction.prediction is either a single object or an array of objects
        if (Array.isArray(ntasData)) {
            ntasData.forEach((prediction) => {
                const { timeInt } = prediction;
                const min = Math.floor(timeInt);
                let seconds = 60 * (timeInt - min);
                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }
                const timeForArrival = `${min}:${seconds}`;
                concatenatedString += `${prediction.trainDirection}bound: Arriving in approximately ${timeForArrival}.\n`;
            });
        } else {
            const tempDate = new Date(parseInt(ntasData.epochTime, 10));
            let hours = tempDate.getHours();
            let min = tempDate.getMinutes();
            let seconds = tempDate.getSeconds();
            let period = 'am';
            if (hours === 12) {
                period = 'pm';
            } else if (hours > 12) {
                hours -= 12;
                period = 'pm';
            }
            if (min < 10) {
                min = `0${min}`;
            }
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            const dateTime = `${hours}:${min}:${seconds} ${period}`;
            concatenatedString += `${ntasData.branch}: Arriving at ${dateTime}, or in approximately ${ntasData.minutes} minutes, or too precise to be accurate: ${Math.floor(ntasData.seconds / 60)}:${ntasData.seconds % 60}`;
        }
        this.setState({ predictions: concatenatedString });
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {/* line selection */}
                <Picker
                    selectedValue={this.state.selectedLine.name}
                    onValueChange={(itemValue) => {
                        this.setState({
                            selectedLine: itemValue
                        });
                    }}>
                    {this.state.subwayLines.map((item) => (
                        <Picker.Item
                            label={item.name}
                            value={item}
                            key={`subway_line_${item.id}`}
                        />
                    ))}
                </Picker>
                {/* station selection */}
                <Picker
                    selectedValue={this.state.selectedStation.name}
                    onValueChange={(itemValue) => {
                        this.setState({
                            selectedStation: itemValue
                        });
                    }}>
                    {this.state.selectedLine.subwayStations.map((station) => (
                        <Picker.Item
                            label={station.name}
                            value={station}
                            key={`subway_station_${station.id}`}
                        />
                    ))}
                </Picker>
                <Button
                    onPress={() => {
                        stationPredictions(this.state.selectedLine.id, this.state.selectedStation.id)
                            .then((res) => {
                                this.parsePredictions(res.data);
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    }}
                    title="Get predictions"
                />
                <View style={{ height: window.height / 6 }}>
                    <Text>
                        {this.state.predictions}
                    </Text>
                </View>
                <Button
                    onPress={() => {
                        this.setState({ visible: true });
                    }}
                    title="Summon modal!"
                    color="green"
                />
                <Modal
                    animationType="fade"
                    transparent
                    visible={this.state.visible}
                    onRequestClose={() => { this.setState({ visible: false }); }}>
                    {/*<View style={styles.overlay}>*/}
                    <View style={{ backgroundColor: 'blanchedalmond', flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <TextInput
                                // style={styles.searchBar}
                                onChangeText={(search) => this.setState({ search })}
                                value={this.state.search}
                            />
                            <View style={{ maxHeight: 532 }}>
                                <FlatList // TODO
                                    data={this.state.selectedLine.subwayStations.filter((station) => {
                                        const lowerCaseString = station.title ? station.title.toLowerCase() : '';
                                        const lowerCaseSearch = this.state.search ? this.state.search.toLowerCase() : '';
                                        return lowerCaseString.includes(lowerCaseSearch);
                                    })}
                                    renderItem={(rowData) => <Text>{rowData.item.name}</Text>}
                                    keyExtractor={(station) => station.name}
                                />
                            </View>
                        </View>
                        <Button
                            onPress={() => {
                                this.setState({ visible: false });
                            }}
                            title="Dismiss modal!"
                            color="red"
                        />
                    </View>
                    {/*</View>*/}
                </Modal>
            </View>
        );
    }
}

export default Experimentation;
