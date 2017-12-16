// const COMMANDS = {
//     AGENCIES: 'agencyList',
//
//     // Alerts..?????????
//     // Usage:
//     // a={agency tag}&r={route tag1}&r={route tagN}
//     MESSAGES: 'messages',
//
//     // Usages:
//     // &a={agency_tag}&stopId={stop id}
//     // &a={agency_tag}&stopId={stop id}&routeTag={route tag}
//     PREDICTIONS: 'predictions',
//
//     // Usage:
//     // &a={agency_tag}&stops={stop 1}&stops={stop 2}&stops={stop n}
//     // args: [], max length = 150
//     PREDICTIONS_FOR_MULTI_STOPS: 'predictionsForMultiStops',
//
//     // Usage:
//     // &a={agency_tag}&r={route tag}
//     // This is how I can get the stop IDs!!!!!!!!! haha xDDD
//     ROUTE_CONFIG: 'routeConfig',
//
//     // Usage:
//     // &a={agency_tag}
//     ROUTES: 'routeList',
//
//     // Usage:
//     // &a={agency_tag}&r={route_tag}
//     SCHEDULE: 'schedule',
//
//     // Usage:
//     // &a={agency_tag}&r={route tag}&t={epoch time in msec}
//     // For mapping, probably. Limit polling to once per 10 sec
//     VEHICLE_LOCATIONS: 'vehicleLocations'
// };
//
// const ARGUMENTS = {
//     // Application would never need to use the argument in its raw form...
//     // Refactor to make class that returns string.replace()
//     // Append selectedAgency to arguments
//     AGENCY: '&a={agency_tag}',
//     ROUTE: '&r={route_tag}',
//     ROUTE_TAG: '&routeTag={route_tag}',
//     STOP: '&s={stop_id}',
//     STOP_ID: '&stopId={stop_id}',
//     STOPS: '&stops={route_tag}|{stop_tag}',
//     TIME: '&t={timestamp}'
// };

let selectedAgency = '&a=ttc';

const changeAgency = (agency) => {
    // selectedAgency exists in the nextBusAPI.src file, since it's a necessity for pretty much all api calls
    // Retrieve from AsyncStorage?
    if (agency) {
        selectedAgency = NextBusArguments.agency(agency);
        return selectedAgency;
    }
    return false;
};

class NextBusCommands {
    static agencies() {
        return `agencyList`;
    }

    static mesages() {
        return `messages${selectedAgency}`;
    }

    static predictions() {
        return `predictions${selectedAgency}`;
    }

    static predictionsForMultiStops() {
        return `predictionsForMultiStops${selectedAgency}`;
    }

    static routeConfig() {
        return `routeConfig${selectedAgency}`;
    }

    static routeList() {
        return `routeList${selectedAgency}`;
    }

    static schedule() {
        return `schedule${selectedAgency}`;
    }

    static vehicleLocations() {
        return `vehicleLocations${selectedAgency}`;
    }
}

class NextBusArguments {
    static agency(agencyTag) {
        return `&a=${agencyTag}`;
    }

    static route(routeTag) {
        return `&r=${routeTag}`;
    }

    static routeTag(routeTag) {
        return `&routeTag=${routeTag}`;
    }

    static stop(stopId) {
        return `&s=${stopId}`;
    }

    static stopId(stopId) {
        return `&stopId=${stopId}`;
    }

    static stops(routeTag, stopTag) {
        return `&stops=${routeTag}|${stopTag}`;
    }

    static time(timeStamp) {
        return `&t=${timeStamp}`;
    }
}

module.exports = {
    changeAgency,
    commands: NextBusCommands,
    arguments: NextBusArguments
};
