const axios = require('axios');

// This is a questionable endpoint. All the queries do is give redundant information lol.
const LINE_INFORMATION_URL = 'https://www.ttc.ca/Subway/getSubwaySystem.action'; // searchCrit=&version=1.3.1&subwayLine=3&stationId=-1&url-input=


// There's actually also '&_=1513645851274' at the end of STATION_INFORMATION_URL, but this doesn't seem to have a functional purpose..
// const STATION_INFORMATION_URL = 'https://www.ttc.ca/Subway/loadNtas.action?subwayLine={subwayLine}&stationId={stationId}&searchCriteria=';
const getStationPredictionUrl = (subwayLine, stationId) =>
    `http://www.ttc.ca/Subway/loadNtas.action?subwayLine=${subwayLine}&stationId=${stationId}&searchCriteria=`;


const axiosInstance = axios.create();

// This function is solely for the getSubwayStationsTTC script, since this downloads a
// 200kb JSON and doesn't seem very data-conservation friendly
const downloadTheWholeSubwaySystem = () => axiosInstance.get(LINE_INFORMATION_URL);

const stationPredictions = (subwayLine, stationId) => axiosInstance.get(getStationPredictionUrl(subwayLine, stationId));

module.exports = {
    downloadTheWholeSubwaySystem,
    stationPredictions
};
