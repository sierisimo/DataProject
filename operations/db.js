var pg = require('pg'),
  pgConf = require(__dirname + '/../conf/psql'),
  fs = require('fs'),
  debug = require('debug')('DB');

function saveInOLTP() {
  var dataInJson;

  try {
    debug("Checking for previous JSON cached file...");

    fs.accessSync(__dirname + '/../data/' + FILE_NAME + '.json', fs.F_OK | fs.R_OK);

    debug("Cached JSON found!")

    dataInJson = require(__dirname + '/../data/' + FILE_NAME + '.json');

    debug("JSON was imported!");
  } catch (e) {
    debug("No JSON previously created, creating a temporal one");
    dataInJson = require(__dirname + '/jsonOps').data;
  }

  createSets(dataInJson);

  // storeInPG(dataInJson);
}

function createSets(obj) {
  var sets = {
    entidades: new Set(obj.nombre_de_la_entidad),
    turnos: new Set(obj.turno),
    tipos_de_escuela: new Set(obj.tipo_de_escuela),
    grados_de_marginacion: new Set(obj["grado_de_marginación"]),
    materias: new Set(["español", "matematicas", "formacion civica y etica"]),
    grados: new Set(["tercero", "cuarto", "quinto"]),
    metricas: new Set(["insuficiente", "elemental", "bueno", "excelente"])
  };

  obj.sets = sets;

  var connectionStr = "postgres://" + pgConf.username + ":" + pgConf.password + "@" + pgConf.host + "/" + pgConf.database;

  pg.connect(connectionStr, function(err, client, done) {
    var query;

    if (err) return done(client);

    for (var table in sets) {
      query = "INSERT INTO " + table + "(nombre) VALUES('";

      sets[table].forEach(function(val) {
        query += val + "'),('";
      });

      debug(table, "==>", query);

      query = query.substring(0, query.length - 3);

      client.query(query, function(err, result) {
        done();

        if (err) return;
      });
    }
  });
}

function storeInPG(jsonObj) {
  var connectionStr = "postgres://" + pgConf.username + ":" + pgConf.password + "@" + pgConf.host + "/" + pgConf.database;

  var handleError = function(err, client) {
    // no error occurred, continue with the request
    if (!err) return false;

    // An error occurred, remove the client from the connection pool.
    // A truthy value passed to done will remove the connection from the pool
    // instead of simply returning it to be reused.
    // In this case, if we have successfully received a client (truthy)
    // then it will be removed from the pool.
    if (client) {
      done(client);
    }

    return true;
  };

  pg.connect(connectionStr, function(err, client, done) {
    if (handleError(err, client)) return;

    client.query('SELECT \'HEllo\'', function(err, result) {
      if (handleError(err, client)) {
        console.error(err);
        return;
      }

      console.log(result);

      done();
    });
  });
}

exports.store = saveInOLTP;
