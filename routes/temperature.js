const express = require('express');
const router = express.Router();

const temperature = require('../models/temperature');
const Temperature = temperature.Temperature;

/* GET home page. */
router.post('/', function(req, res, next) {
  var obj = req.body;
  var t = new Temperature(obj.temperature);
  t.save();
  res.send(obj);
});

router.get('/', function(req, res, next) {
  temperature.queryAll(function(err, entries) {
    if (err) {
      next();
    }
    res.json(entries);
  });
});

module.exports = router;
