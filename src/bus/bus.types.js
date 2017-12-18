import createActionSet from 'utils/createActionSet';

export const SELECT_BUS_ROUTE = 'SELECT_BUS_ROUTE';
export const SELECT_BUS_DIRECTION = 'SELECT_BUS_DIRECTION';
export const SELECT_BUS_STOP = 'SELECT_BUS_STOP';

export const FETCH_BUS_PREDICTION_SINGLE = createActionSet('FETCH_BUS_PREDICTION_SINGLE');
export const FETCH_BUS_PREDICTION_MULTIPLE = createActionSet('FETCH_BUS_PREDICTION_MULTIPLE');
