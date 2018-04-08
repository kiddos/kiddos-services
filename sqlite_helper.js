const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const settings = require('./settings');

const db = new sqlite3.Database(path.join(__dirname, settings.db_name));

module.exports = {
  db: db,
};
