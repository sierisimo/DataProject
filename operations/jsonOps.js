var csv = require('./csv'),
  debug = require('debug')('JSON Operations');

function storeInFile() {
  var json = toJSON(csv.asArray);

  debug("Writting to file system...");

  require('fs').writeFileSync('./data/' + FILE_NAME + '.json', JSON.stringify(json), 'utf8');

  debug("...DONE");
}

function toJSON(csvArrayContent) {
  var headers = csvArrayContent.shift(),
    result = {},
    header;
  debug("Generating JSON data...");

  for (var i = 0; i < headers.length; i++) {
    header = headers[i].toLowerCase();
    header = header.replace(/\s/g, '_')
      .replace(/\./g, '');

    result[header] = [];

    for (var j = 0; j < csvArrayContent.length; j++) {
      if (csvArrayContent[j][i].length === 0) {
        result[header].push(null);
      } else {
        if (header === 'ent') {
          result[header].push(Number.parseInt(csvArrayContent[j][i]));
        } else {
          result[header].push(csvArrayContent[j][i]);
        }
      }
    }
  }

  return result;
}

exports.__data;
exports.__defineGetter__('data', function() {
  if (!this.__data)
    __data = toJSON(csv.asArray);

  return __data;
});

exports.toFile = storeInFile;
