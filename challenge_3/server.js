var express = require('express');
var server = express();
server.use(express.static(__dirname + '/public'));
server.use('/compiled', express.static(__dirname + '/compiled'))

server.listen(3000);
console.log("Listening on 3000");

