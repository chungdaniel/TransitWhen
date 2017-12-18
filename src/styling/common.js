import {
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');
export const window = { width, height };

export const NAMED_COLORS = {
    black: '#0E1111'
};

export const TYPOGRAPHY = {
    appBar: {
        fontWeight: '500',
        fontSize: 20 // Title style
    },

    buttons: {
        English: {
            fontWeight: '500',
            fontSize: 14
        },
        Dense: {
            fontWeight: '500',
            fontSize: 15
        },
        Tall: {
            fontWeight: 'bold',
            fontSize: 15
        }
    },


    subheading: {
        English: {
            fontWeight: 'normal',
            fontSize: 16
        },
        Dense: {
            fontWeight: 'normal',
            fontSize: 17
        },
        Tall: {
            fontWeight: 'normal',
            fontSize: 17
        }
    },


    body: {
        English: {
            fontWeight: 'normal',
            fontSize: 14
        },
        Dense: {
            fontWeight: 'normal',
            fontSize: 15
        },
        Tall: {
            fontWeight: 'normal',
            fontSize: 15
        }
    }

};
