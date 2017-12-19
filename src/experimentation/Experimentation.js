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
import * as nextBusApi from 'api/next_bus/nextBusApi';
// TODO find someway to make this dynamic...
import routes from 'seed_data/20171217_ttc_pertinent.json';
import { window } from '../styling/common';

class Experimentation extends Component {
    static navigationOptions = {
        tabBarLabel: 'BusExp'
        // Note: By seed_data the icon is only shown on iOS. Search the showIcon option below.
    };

    constructor() {
        super();
        this.state = {
            predictions: '',
            selectedRoute: {
                direction: [
                    {
                        branch: '',
                        name: '',
                        stop: [
                            {
                                tag: ''
                            }
                        ],
                        title: ''
                    }
                ],
                stop: [
                    {
                        stopId: '',
                        tag: '',
                        title: ''
                    }
                ],
                tag: '',
                title: ''
            },
            selectedDirection: {
                branch: '',
                name: '',
                stop: [
                    {
                        tag: '',
                        title: ''
                    }
                ],
                title: ''
            },
            selectedStopTag: '',
            routes,
            visible: false,
            search: ''
        };
    }

    parsePredictions = (predictions) => {
        const currentTime = new Date();
        let concatenatedString = `The current time is ${currentTime.toLocaleTimeString()}.\n`;
        const sketchyObject = predictions.predictions.direction.prediction;
        // direction.prediction is either a single object or an array of objects
        if (Array.isArray(sketchyObject)) {
            sketchyObject.forEach((prediction) => {
                const tempDate = new Date(parseInt(prediction.epochTime, 10));
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
                concatenatedString += `${prediction.branch}: Arriving at ${dateTime}, or in approximately ${Math.floor(prediction.seconds / 60)}:${prediction.seconds % 60 < 10 ? `0${prediction.seconds % 60}` : prediction.seconds % 60}\n`;
            });
        } else {
            const tempDate = new Date(parseInt(sketchyObject.epochTime, 10));
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
            concatenatedString += `${sketchyObject.branch}: Arriving at ${dateTime}, or in approximately ${sketchyObject.minutes} minutes, or too precise to be accurate: ${Math.floor(sketchyObject.seconds / 60)}:${sketchyObject.seconds % 60}`;
        }
        this.setState({ predictions: concatenatedString });
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {/* route selection */}
                <Picker
                    selectedValue={this.state.selectedRoute.title}
                    onValueChange={(itemValue) => {
                        this.setState({
                            selectedRoute: itemValue
                        });
                    }}>
                    {this.state.routes.map((item) => (
                        <Picker.Item
                            label={item.title}
                            value={item}
                            key={`route_${item.tag}`}
                        />
                    ))}
                </Picker>
                {/* direction selection */}
                <Picker
                    selectedValue={this.state.selectedDirection.title}
                    onValueChange={(itemValue) => {
                        const selectedDirectionWithStopTitles = { ...itemValue, stop: [] };
                        itemValue.stop.forEach((stop) => {
                            const stopObj = this.state.selectedRoute.stop.find((stop2) => stop2.tag === stop.tag);
                            selectedDirectionWithStopTitles.stop.push(stopObj || { tag: '', title: '' });
                        });
                        this.setState({
                            selectedDirection: selectedDirectionWithStopTitles
                        });
                    }}>
                    {this.state.selectedRoute.direction.map((direction) => (
                        <Picker.Item
                            label={direction.title} // .find
                            value={direction}
                            key={`direction_${direction.tag}`}
                        />
                    ))}
                </Picker>
                {/* stop selection */}
                <Picker
                    selectedValue={this.state.selectedStopTag}
                    onValueChange={(itemValue) => {
                        this.setState({
                            selectedStopTag: itemValue
                        });
                    }}>
                    {this.state.selectedDirection.stop.map((stop) => (
                        <Picker.Item
                            label={stop.title}
                            value={stop.tag}
                            key={`stop_${stop.tag}`}
                        />
                    ))}
                </Picker>
                <Button
                    onPress={() => {
                        nextBusApi.singleStopPredictionsByStopTag(this.state.selectedRoute.tag, this.state.selectedStopTag)
                            .then((res) => {
                                this.parsePredictions(res.data);
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
                                <FlatList
                                    data={this.state.selectedDirection.stop.filter((stop) => {
                                        const lowerCaseString = stop.title ? stop.title.toLowerCase() : '';
                                        const lowerCaseSearch = this.state.search ? this.state.search.toLowerCase() : '';
                                        return lowerCaseString.includes(lowerCaseSearch);
                                    })}
                                    renderItem={(rowData) => <Text>{rowData.item.title}</Text>}
                                    keyExtractor={(stop) => Math.random()}
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
