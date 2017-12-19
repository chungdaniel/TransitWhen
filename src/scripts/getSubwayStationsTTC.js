const fs = require('fs');
const now = require('performance-now');
const ProgressBar = require('progress');
const ttcSubwayApi = require('../api/ttc/ttcSubwayApi');

const { log, error } = console;

const FILE_NAME = 'ttc_subway_system';

const extractStations = (subwayLines) => {
    const bar = new ProgressBar(':bar :percent', { total: subwayLines.length, complete: '█' });
    const startTime = now();
    const reducedSubwayLines = [];
    subwayLines.forEach((line) => {
        const reducedLine = {
            abbr: line.abbr,
            id: line.id,
            name: line.name,
            subwayStations: []
        };
        line.subwayStations.forEach((subwayStation) => {
            reducedLine.subwayStations.push({
                id: subwayStation.id,
                name: subwayStation.name,
                subwayLine: subwayStation.subwayLine,
                subwayStationOrder: subwayStation.subwayStationOrder
            });
        });
        reducedSubwayLines.push(reducedLine);
        bar.tick();
        if (bar.complete) {
            const endTime = now();
            const duration = (endTime - startTime) / 1000;
            log(`${reducedSubwayLines.length} / ${subwayLines.length} configs obtained in ${duration.toPrecision(3)} seconds`);
            writeToNewFile(reducedSubwayLines, FILE_NAME);
        }
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

ttcSubwayApi.downloadTheWholeSubwaySystem()
    .then((res) => {
        log(`You just downloaded a bunch of redundant (?) information from the TTC. Skimming the list down...`);
        extractStations(res.data.subwayLines);
    })
    .catch((err) => {
        error(err);
    });
