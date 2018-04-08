describe('Temperature', function() {
  const http = require('http');
  const temperature = require('../models/temperature');
  const Temperature = temperature.Temperature;

  it('Should be initialize with constructor', function() {
    var t = new Temperature(25.3);
    expect(t.value).toBeTruthy();
    expect(t.time).toBeTruthy();
  });

  it('Should be able to be saved', function() {
    var t = new Temperature(23.3);
    t.save();

    temperature.queryAll(function(err, entries) {
      expect(err).toBe(null);

      expect(entries[entries.length - 1].value).toBe(t.value);
      expect(entries[entries.length - 1].time).toBe(t.time);
    });
  });

  it('Should be save when post', function(done) {
    var data = { temperature: 22.4 };
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: '/temperature',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    var req = http.request(options, function(res) {
      res.on('data', function(response) {
        var obj = JSON.parse(response);
        expect(obj.temperature).toBe(data.temperature);
        done();
      });
    });
    req.write(JSON.stringify(data));
    req.end();
  });
});
