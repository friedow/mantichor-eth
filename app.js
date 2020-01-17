var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

  const ganachePort = 7585;
  const ganache = require("ganache-core");
  const server = ganache.server();
  const provider = server.provider;
  server.listen(ganachePort, function(err, blockchain) { 
    console.log(`Ganache listening on port ${ganachePort}`)
  });
});
