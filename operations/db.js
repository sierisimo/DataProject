var pg = require('pg'),
  fs = require('fs'),
  debug = require('debug')('DB');

function saveInOLTP() {
  var dataInJson;

  try {
    fs.accessSync('./data' + FILE_NAME, fs.F_OK);
  } catch (e) {
    debug("No JSON previously created, creating a temporal one");
    dataInJson = require('./jsonOps').data;
    debug(dataInJson.ent.length);
  }
}

exports.store = saveInOLTP;
