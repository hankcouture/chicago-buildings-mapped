var express = require('express');
var fs = require('fs');
var buildings = require("./buildings.json");
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.get('/buildings', function(req, res){
    res.setHeader('Content-Type', "application/json");
    res.status(200).send(JSON.stringify(buildings));
});

app.post('/', function(req, res){
    res.setHeader('Content-Type', "application/json");
    req.on('data', function (data) {
        dataParsed = JSON.parse(data);
        buildings.results.unshift(dataParsed);
        newData = JSON.stringify(buildings);
        fs.writeFile("./buildings.json", newData, "utf8");
    });
    res.status(201).send("success");
});

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});