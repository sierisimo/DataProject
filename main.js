var xls = require('xlsjs'),
  workbook = xls.readFile('./data/escuelas_enlace_nacional.xls');

console.log(workbook);
