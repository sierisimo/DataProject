var fs = require('fs'),
  debug = require('debug')('FileSystem');

function deleteFiles() {
  try {
    debug("Cleaning file: " + './data/' + FILE_NAME + '.json');
    fs.unlinkSync('./data/' + FILE_NAME + '.json');
  } catch (e) {
    debug("No files to clean");
  }

  debug("All cleaning done");
}

exports.clean = deleteFiles;
