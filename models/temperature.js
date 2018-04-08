const sqlite_helper = require('../sqlite_helper');
const db = sqlite_helper.db;

function Temperature(value) {
  this.time = new Date().getTime();
  this.value = value;
}

function init() {
  db.serialize(function() {
    db.run(`DROP TABLE IF EXISTS temperatures;`);
    db.run(`CREATE TABLE IF NOT EXISTS temperatures(
        value FLOAT NOT NULL,
        time DATE NOT NULL);`);
  });
}

function queryAll(callback) {
  db.serialize(function() {
    db.all(`SELECT * FROM temperatures;`, callback);
  });
}

Temperature.prototype.save = function(callback) {
  var t = this;
  db.serialize(function() {
    db.run(`INSERT INTO temperatures(value, time) VALUES(?, ?)`,
      t.value, t.time);
  });
};

module.exports = {
  init: init,
  queryAll: queryAll,
  Temperature: Temperature,
};
