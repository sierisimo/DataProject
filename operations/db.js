var pg = require('pg'),
  fs = require('fs'),
  debug = require('debug')('DB');

function saveInOLTP() {
  var dataInJson;

  try {
    debug("Checking for previous JSON cached file...");

    fs.accessSync('./data/' + FILE_NAME + '.json', fs.F_OK);

    debug("Cached JSON found!")

    dataInJson = require('./data/' + FILE_NAME + '.json');
  } catch (e) {
    debug("No JSON previously created, creating a temporal one");
    dataInJson = require('./jsonOps').data;
  }
}

exports.store = saveInOLTP;
