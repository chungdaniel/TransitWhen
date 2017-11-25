export const NEXT_BUS_BASE_URL = 'http://webservices.nextbus.com/service/publicJSONFeed?command=';

// This should be a class (?) with public (???) functions
export const API_CONSTANTS = {
    agencies: 'agencyList',

    routeConfig: 'routeConfig&a={agency_tag}&r={route tag}',    // Not sure what this is, potentially unneeded
    routes: 'routeList&a={agency_tag}',

    stopPredictionsAll: 'predictions&a={agency_tag}&stopId={stop id}&routeTag={route tag}',
    stopPredictionsRoute: 'predictions&a={agency_tag}&stopId={stop id}',

    // args: [], max length = 150
    multiStopPredictions: 'predictionsForMultiStops&a={agency_tag}&stops={stop 1}&stops={stop 2}&stops={stop3}\n',

    schedule: 'schedule&a={agency_tag}&r={route_tag}',

    // Alerts..?????????
    messages: 'messages&a={agency tag}&r={route tag1}&r={route tagN}',

    // For mapping, probably. Limit polling to once per 10 sec
    vehicleLocations: 'vehicleLocations&a={agency_tag}&r={route tag}&t={epoch time in msec}'
};