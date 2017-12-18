import React from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

import { TYPOGRAPHY } from 'styling/common';

const PickerModalItem = ({ onPress, text }) => (
    <TouchableOpacity
        onPress={onPress}>
        <View>
            <Text
                style={}
            >
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

PickerModalItem.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default PickerModalItem;
