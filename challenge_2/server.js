var express = require('express');
var bodyParser = require('body-parser');
var server = express();

//server.use(bodyParser)

server.listen(3000);
console.log('Listening on 3000');
server.use(express.static(__dirname + "/client"))
server.use("/node_modules", express.static(__dirname+"/node_modules"))

server.post('/', (req, res) => {
	res.status(201);
	res.set(headers)
	res.send('cool');
})


var headers = {
	"Access-Control-Allow-Origin": "*",
	'Content-Type': 'text/plain'
};
