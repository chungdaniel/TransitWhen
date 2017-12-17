const readline = require('readline');
const fs = require('fs');
const now = require('performance-now');
const ProgressBar = require('progress');
const nextBusAPI = require('../api/next_bus/nextBusAPI');
const nextBusUtils = require('../api/next_bus/nextBusUtils');

const { log, error } = console;
let agency,
    agencyList;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// For later implementing flags to include the full list or not :)
// var program = require('commander');
//
// program
//     .version('0.1.0')
//     .option('-if, --peppers', 'Add peppers')
//     .option('-n, --pineapple', 'Add pineapple')
//     .option('-b, --bbq-sauce', 'Add bbq sauce')
//     .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//     .parse(process.argv);
//
// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

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
    const bar = new ProgressBar(':bar :percent', { total: routeList.length, complete: '█' });
    const fullRouteListConfig = [];
    const pertinentRouteListConfig = [];
    const startTime = now();
    routeList.forEach((route) => {
        nextBusAPI.routeConfig(route.tag)
            .then((res) => {
                bar.tick();
                fullRouteListConfig.push(res.data);
                const { route } = res.data;
                const pertinentData = {
                    title: route.title,
                    direction: route.direction,
                    stop: route.stop,
                    tag: route.tag
                };
                pertinentRouteListConfig.push(pertinentData);
                if (bar.complete) {
                    const endTime = now();
                    const duration = (endTime - startTime) / 1000;
                    log(`${fullRouteListConfig.length} / ${routeList.length} configs obtained in ${duration.toPrecision(3)} seconds`);
                    // writeToNewFile(fullRouteListConfig, `${agency}_full`);
                    // This might only work for TTC, since the tags are all numerical
                    pertinentRouteListConfig.sort((a, b) => parseFloat(a.tag) - parseFloat(b.tag));
                    writeToNewFile(pertinentRouteListConfig, `${agency}_pertinent`);
                }
            })
            .catch((err) => {
                error(err);
            });
    });
};

const writeToNewFile = (data, name) => {
    const timestamp = new Date();
    const year = timestamp.getUTCFullYear();
    const month = timestamp.getUTCMonth() + 1; //months from 1-12
    const day = timestamp.getUTCDate();
    const json = JSON.stringify(data);
    log(`Writing ${year}${month}${day}_${name}.json to TransitWhen/src/seed_data/`);
    fs.writeFile(`${__dirname}/../seed_data/${year}${month}${day}_${name}.json`, json, 'utf8', processComplete);
};

const processComplete = () => {
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
