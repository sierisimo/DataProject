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
      var innerArr = [],
        words = "";
      for (var o = 0; o < el.length; o++) {
        if (el[o] !== ',' && el[o] !== '"') {
          words += el[o];
          continue;
        } else if (el[o] === '"') {
          o++;
          while (el[o] !== '"') {
            try{
            words += el[o];
            o++;
          }catch(e){
            console.log("SIER"+inx);
            console.log(words);
            throw e;
          }

          }
        }

        innerArr.push(words);
        words = "";
      }
      a[inx] = innerArr;
    });

  // arrLines.forEach((el, inx, a) => a[inx] = el.split(','));
  return arrLines;
}

exports.asArray = asArray();
