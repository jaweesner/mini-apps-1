var express = require('express');
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.json());

server.listen(3000);
console.log('Listening on 3000');
server.use(express.static(__dirname + "/client"))
server.use("/node_modules", express.static(__dirname+"/node_modules"))
//server.use(bodyParser.urlencoded())

server.options('/', (req,res) =>{
	res.set(headers);
	res.send();
})

server.post('/', (req, res) => {
	json = JSON.parse(req.body.info);
	res.status(201);
	res.set(headers);
	res.send(toCSV(json));
})


var headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "*",
	'Content-Type': 'text/plain'
};

var toCSV= function(obj){
	var indexCount = 0;
	var fieldObj = {};
	var csvArr = [];
	var toDoObj = [obj]
	while(toDoObj.length>0){
		var currObj=toDoObj.pop();
		csvArr.push([]);
		for(var key in currObj){
			if (key === "children"){
				currObj.children.forEach((child)=>toDoObj.push(child));
			} else if (fieldObj.hasOwnProperty(key)){
				csvArr[csvArr.length-1][fieldObj[key]] = currObj[key];
			}else{
				fieldObj[key] = indexCount++;
				csvArr[csvArr.length-1][fieldObj[key]] = currObj[key];
			}
		}
	}
	var finalStr = Object.keys(fieldObj) + '\n';
	for (var i=0; i<csvArr.length; i++){
		while (csvArr[i].length<indexCount){
			csvArr[i].push("");
		}
	}
	return finalStr + (csvArr.join('\n'));
}