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
    arrLines = csvStr.split('\n'),
    innerArr, words, o, backWord;

  if (arrLines[arrLines.length - 1].length === 0) {
    arrLines.pop();
  }

  arrLines.forEach(function(el, inx, a) {
    innerArr = [];
    words = "";

    for (o = 0; o < el.length; o++) {
      if (el[o] !== ',' && el[o] !== '"') {
        words += el[o];
        backWord = words;
        continue;
      } else if (el[o] === '"') {
        o++;
        while (el[o] !== '"') {
          words += el[o];
          o++;
        }
      } else {
        innerArr.push(words);
        words = "";
      }
    }
    innerArr.push(backWord);

    a[inx] = innerArr;
  });

  return arrLines;
}

exports.asArray = asArray();
