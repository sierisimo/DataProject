var debug = require('debug')('CSV');


function readFile() {
  var fs = require('fs'),
    content = fs.readFileSync('./data/' + FILE_NAME + '.csv', {
      encoding: 'utf8'
    });
  debug('File was read');

  return content;
}

function asArray() {
  var csvStr = readFile(),
    arrLines = csvStr.split('\n');

  if (arrLines[arrLines.length - 1].length === 0) {
    arrLines.pop();
  }

  arrLines.forEach(function(el, inx, a) {
    el = el.split(',');
    a[inx] = el;
  });

  return arrLines;
}

exports.asArray = asArray();
