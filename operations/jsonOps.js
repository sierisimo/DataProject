var csv = require('./csv'),
  debug = require('debug')('JSON Operations');

function storeInFile(fileName) {
  var json = toJSON(csv.asArray);

  require('fs').writeFileSync('./data/' + fileName, JSON.stringify(json), 'utf8');
}

function toJSON(csvArrayContent) {
  var headers = csvArrayContent.shift(),
    result = {},
    header;

  for (var i = 0; i < headers.length; i++) {
    header = headers[i].toLowerCase();
    header = header.replace(/\s/g, '_')
      .replace(/\./g, '');

    result[header] = [];

    for (var j = 0; j < csvArrayContent.length; j++) {
      if (csvArrayContent[j][i].length === 0)
        result[header].push(null);
      else
        result[header].push(csvArrayContent[j][i]);
    }
  }

  return result;
}

exports.data = (function() {
  return toJSON(csv.asArray);
})();

exports.toFile = storeInFile;
