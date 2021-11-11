var csv = require("csvtojson");
const converter = require('json-2-csv');
const fs = require("fs");
const { Parser } = require('json2csv');
const json2csvParser = new Parser({ delimiter: ';', header: false });

const getsCSVData = (filepath) => {
    return csv({
        delimiter: [";"]
    })
        .fromFile(filepath)
}


const addDataToCsv = (obj, path) => {
    const csvData = json2csvParser.parse(obj);
    fs.appendFile(path, csvData + "\r\n", (err) => {
        if (err) {
            console.log(error)
        }

    });
}

var isEmpty = function(obj) {
    console.log(Object.keys(obj).length === 0)
    return Object.keys(obj).length === 0;
  }



module.exports = {
    getsCSVData,
    addDataToCsv,
    isEmpty
}

