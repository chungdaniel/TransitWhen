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
import * as nextBusAPI from 'api/next_bus/nextBusAPI';
// TODO find someway to make this dynamic...
import routes from 'seed_data/20171217_ttc_pertinent.json';

class Experimentation extends Component {
    static navigationOptions = {
        tabBarLabel: 'Experimentation'
        // Note: By seed_data the icon is only shown on iOS. Search the showIcon option below.
    };

    constructor() {
        super();
        this.state = {
            predictions: '',
            currentTime: '',
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
            visible: false
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
                        nextBusAPI.singleStopPredictionsByStopTag(this.state.selectedRoute.tag, this.state.selectedStopTag)
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
                <Button
                    onPress={() => {
                        this.setState({ visible: true });
                    }}
                    title="Summon modal!"
                />
                <Modal
                    animationType="fade"
                    transparent
                    visible={this.state.visible}
                    onRequestClose={() => { this.setState({ visible: false }); }}>
                    {/*<View style={styles.overlay}>*/}
                        <View style={{ backgroundColor: 'red' }}>
                            <TextInput
                                // style={styles.searchBar}
                                onChangeText={(search) => this.setState({ search })}
                                value={this.state.search}
                            />
                            <FlatList
                                data={this.state.selectedDirection.stop.filter((stop) => stop.title.includes('Lawrence'))}
                                renderItem={(rowData) => <Text>{rowData.item.title}</Text>}
                                keyExtractor={(stop) => Math.random()}
                            />
                    <Button
                        onPress={() => {
                            this.setState({ visible: false });
                        }}
                        title="Dismiss modal!"
                    />
                        </View>
                    {/*</View>*/}
                </Modal>
            </View>
        );
    }
}

export default Experimentation;
