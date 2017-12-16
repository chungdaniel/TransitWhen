const axios = require('axios');
const NextBus = require('./nextBusUtils');
// NextBusCommands,
//     NextBus.arguments

const BASE_URL = 'http://webservices.nextbus.com/service/publicJSONFeed?command=';
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.url = BASE_URL + config.url;
    return config;
}, (error) => {
    // Do something with request error
    // an error really shouldn't be possible...
    Promise.reject(error);
});

// The only thing you can do is get, so no point in prepending all methods with 'get'
function agencies() {
    // axiosInstance.get(COMMANDS.AGENCIES)
    //     .then(result => result.data);
    return axios.get(BASE_URL + NextBus.commands.agencies());
}

function routeList() {
    return axiosInstance.get(NextBus.commands.routeList());
}

function routeConfig(routeTag) {
    // It seems like it's not possible to specify more than one route...
    // Also, for agencies with lots of routes e.g. TTC, response does not handle more than 100 routes, so
    // need to do one by one..?
    let url = NextBus.commands.routeConfig();
    if (routeTag) {
        url += NextBus.arguments.routeTag(routeTag);
    }
    return axiosInstance.get(url);
}

function singleStopPredictionsByStopId(stopId, routeTag) {
    // &a=<agency_tag>&stopId=<stop id>
    // &a=<agency_tag>&stopId=<stop id>&routeTag=<route tag>
    let url = NextBus.commands.predictions() + NextBus.arguments.stopId(stopId);
    if (routeTag) {
        url += NextBus.arguments.routeTag(routeTag);
    }
    return axiosInstance.get(url);
}

function singleStopPredictionsByStopTag(routeTag, stopTag) {
    // &a=<agency_tag>&r=<route tag>&s=<stop tag>
    const url = NextBus.commands.predictions() + NextBus.arguments.route(routeTag) + NextBus.arguments.stop(stopTag);
    return axiosInstance.get(url);
}

function multiStopPredictions(stops) {
    // Takes a maximum of 150 stops
    // &a=<agency_tag>&stops=<stop 1>&stops=<stop 2>&stops=<stop3>
    // <stop> = '&stops={route_tag}|{stop_tag}'
    // expect stops to be array of objects consisting of route tag and stop tag
    if (stops.length > 150 || stops.length === 0) {
        return new Error('No stops provided!');
    }
    let url = NextBus.commands.predictionsForMultiStops();
    stops.forEach((stop) => {
        url += NextBus.arguments.stops(stop.route_tag, stop.stop_tag);
    });
    return axiosInstance.get(url);
}

function schedule(routeTag) {
    // &a={agency_tag}&r={route_tag}
    const url = NextBus.commands.schedule() + NextBus.arguments.route(routeTag);
    return axiosInstance.get(url);
}

function messages(routeTags) {
    // a={agency tag}&r={route tag1}&r={route tagN}
    let url = NextBus.commands.mesages();
    if (routeTags) {
        routeTags.forEach((routeTag) => {
            url += NextBus.arguments.route(routeTag);
        });
    }
    return axiosInstance.get(url);
}

function vehicleLocations(routeTag, timeStamp) {
    // &a={agency_tag}&r={route tag}&t={epoch time in msec}
    let url = NextBus.commands.vehicleLocations() + NextBus.arguments.route(routeTag);
    if (timeStamp) {
        url += NextBus.arguments.time(timeStamp);
    } else {
        url += NextBus.arguments.time(Date.getTime());
    }
    return axiosInstance.get(url);
}

module.exports = {
    agencies,
    routeList,
    routeConfig,
    singleStopPredictionsByStopId,
    singleStopPredictionsByStopTag,
    multiStopPredictions,
    schedule,
    messages,
    vehicleLocations
};
