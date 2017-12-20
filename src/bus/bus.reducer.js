// TODO find someway to make this dynamic...
import {
    SELECT_BUS_DIRECTION,
    SELECT_BUS_ROUTE,
    SELECT_BUS_STOP,
    FETCH_BUS_PREDICTION_MULTIPLE,
    FETCH_BUS_PREDICTION_SINGLE
} from './bus.types';

export const initialState = {
    predictions: [
        {}
    ],
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
    selectedStop: {},
    routes,
    visible: false
};

export const busReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECT_BUS_DIRECTION:
            return {
                ...state,
                isPendingUnread: true
            };
        case SELECT_BUS_ROUTE:
            return {
                ...state,
                unread: action.payload,
                isPendingUnread: false
            };
        case SELECT_BUS_STOP:
            return {
                ...state,
                error: action.payload,
                isPendingUnread: false
            };
        default:
            return state;
    }
};
