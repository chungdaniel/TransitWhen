const readline = require('readline');
// const nextBusAPI = require('../../api/next_bus/nextBusAPI');
//
// nextBusAPI.singleStopPredictionsByStopId(4876)
//     .then((res) => {
//         console.log(res.data);
//     });
let agency;
function ask(question, callback) {
    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r.question(`${question}\n`, (answer) => {
        r.close();
        callback(answer);
    });
}

ask('Enter the tag of the agency you would like to create seed data for.', (answer) => {
    agency = answer;
    console.log(answer);
});

