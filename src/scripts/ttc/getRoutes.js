const readline = require('readline');
const fs = require('fs');
const ProgressBar = require('progress');
const nextBusAPI = require('../../api/next_bus/nextBusAPI');
const nextBusUtils = require('../../api/next_bus/nextBusUtils');

const { log, error } = console;
let agency,
    agencyList;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const userInputAgency = (checkAgainst) => {
    rl.question('Agency: ', (answer) => {
        if (checkAgainst.some((x) => answer === x.tag)) { //we need some base case, for recursion
            nextBusUtils.changeAgency(answer);
            log(`Selecting agency ${answer}. Fetching route list for ${answer}...`);
            nextBusAPI.routeList()
                .then((res) => {
                    log(`Route list acquired! There are ${res.data.route.length} routes for ${answer}.`);
                    getRouteConfig(res.data.route, answer);
                })
                .catch((err) => {
                    error(err);
                });
            rl.close();
            return;
        } //closing RL and returning from function.
        log(`Sorry, ${answer} is not a valid agency. Please try again`);
        userInputAgency(checkAgainst); //Calling this function again to ask new question
    });
};

const getRouteConfig = (routeList, agency) => {
    log(`Fetching route list config for ${agency}`);
    const bar = new ProgressBar(':bar :elapsed :percent', { total: routeList.length, complete: '█' });
    const fullRouteListConfig = [];
    const pertinentRouteListConfig = [];
    routeList.forEach((route) => {
        nextBusAPI.routeConfig(route.tag)
            .then((res) => {
                bar.tick();
                fullRouteListConfig.push(res.data);
                const { route, copyright } = res.data;
                const pertinentData = {
                    route: {
                        stop: route.stop,
                        title: route.title,
                        direction: route.direction,
                        tag: route.tag
                    },
                    copyright
                };
                pertinentRouteListConfig.push(pertinentData);
                if (bar.complete) {
                    log(`${fullRouteListConfig.length} / ${routeList.length} configs obtained`);
                    writeToNewFile(fullRouteListConfig, `${agency}_full`);
                    writeToNewFile(pertinentRouteListConfig, `${agency}_pertinent`);
                }
            })
            .catch((err) => {
                error(err);
            });
    });
};

const writeToNewFile = (data, name) => {
    log(`Writing data to new file`);
    const timestamp = new Date();
    const year = timestamp.getUTCFullYear();
    const month = timestamp.getUTCMonth() + 1; //months from 1-12
    const day = timestamp.getUTCDate();
    const json = JSON.stringify(data);
    fs.writeFile(`${year}${month}${day}_${name}.json`, json, 'utf8', processComplete);
};

const processComplete = () => {
    log('Process complete!');
    // process.exit();
};

nextBusAPI.agencies()
    .then((res) => {
        log(`List of agencies fetched. There are ${res.data.agency.length} agencies in total.`);
        agencyList = res.data.agency;
        agency = userInputAgency(agencyList);
        log(agency);
    })
    .catch((err) => {
        error(err);
    });
