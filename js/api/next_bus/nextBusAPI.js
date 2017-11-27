import axios from 'axios';
import {
    AsyncStorage
} from 'react-native';
import {
    NextBusCommands,
    NextBusArguments
} from './nextBusUtils';

// For allowing XHR requests to show in the Network tab in Chrome DevTools =)
// IMPORTANT remove following line when running tests
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

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

export default class NextBusAPICalls {
    // The only thing you can do is get, so no point in prepending all methods with 'get'
    static agencies() {
        // axiosInstance.get(COMMANDS.AGENCIES)
        //     .then(result => result.data);
        return axios.get(BASE_URL + NextBusCommands.agencies());
    }

    static routeList() {
        return axiosInstance.get(NextBusCommands.routeList());
    }

    static routeConfig(routeTag) {
        // It seems like it's not possible to specify more than one route...
        // Also, for agencies with lots of routes e.g. TTC, response does not handle more than 100 routes, so
        // need to do one by one..?
        let url = NextBusCommands.routeConfig();
        if (routeTag) {
            url += NextBusArguments.routeTag(routeTag);
        }
        return axiosInstance.get(url);
    }

    static singleStopPredictionsByStopId(stopId, routeTag) {
        // &a=<agency_tag>&stopId=<stop id>
        // &a=<agency_tag>&stopId=<stop id>&routeTag=<route tag>
        let url = NextBusCommands.predictions() + NextBusArguments.stopId(stopId);
        if (routeTag) {
            url += NextBusArguments.routeTag(routeTag);
        }
        return axiosInstance.get(url);
    }

    static singleStopPredictionsByStopTag(routeTag, stopTag) {
        // &a=<agency_tag>&r=<route tag>&s=<stop tag>
        const url = NextBusCommands.predictions() + NextBusArguments.route(routeTag) + NextBusArguments.stop(stopTag);
        return axiosInstance.get(url);
    }

    static multiStopPredictions(stops) {
        // Takes a maximum of 150 stops
        // &a=<agency_tag>&stops=<stop 1>&stops=<stop 2>&stops=<stop3>
        // <stop> = '&stops={route_tag}|{stop_tag}'
        // expect stops to be array of objects consisting of route tag and stop tag
        if (stops.length > 150 || stops.length === 0) {
            return new Error('No stops provided!');
        }
        let url = NextBusCommands.predictionsForMultiStops();
        stops.forEach((stop) => {
            url += NextBusArguments.stops(stop.route_tag, stop.stop_tag);
        });
        return axiosInstance.get(url);
    }

    static schedule(routeTag) {
        // &a={agency_tag}&r={route_tag}
        const url = NextBusCommands.schedule() + NextBusArguments.route(routeTag);
        return axiosInstance.get(url);
    }

    static messages(routeTags) {
        // a={agency tag}&r={route tag1}&r={route tagN}
        let url = NextBusCommands.mesages();
        if (routeTags) {
            routeTags.forEach((routeTag) => {
                url += NextBusArguments.route(routeTag);
            });
        }
        return axiosInstance.get(url);
    }

    static vehicleLocations(routeTag, timeStamp) {
        // &a={agency_tag}&r={route tag}&t={epoch time in msec}
        let url = NextBusCommands.vehicleLocations() + NextBusArguments.route(routeTag);
        if (timeStamp) {
            url += NextBusArguments.time(timeStamp);
        } else {
            url += NextBusArguments.time(Date.getTime());
        }
        return axiosInstance.get(url);
    }
}

