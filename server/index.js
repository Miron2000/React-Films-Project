//NODE
// // const fs = require('fs');
// const http = require('http');
//
// const server = http.createServer(function(req, res) {
//     console.log('URL страницы' + req.url)
//     if(req.url === '/index' || req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//         // fs.createReadStream(__dirname + '../public/index.html').pipe(res);
//         res.end('Hello world');
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
//         res.end('404 - ERROR');
//     }
// });
//
// server.listen(5000, '192.168.0.102');
// console.log('Start');

//EXPRESS порт (http://192.168.0.102:5000/)
const express = require('express');

const app = express();
app.get('/', function (req, res) {
    res.send('Hello world')
    // res.sendFile(__dirname + '../public/index.html');
});
app.get('/id/:id', function(req, res){
    res.send(`ID is ${req.params.id}`);
});
app.get('/name/:name', function(req, res){
    res.send(`Name is ${req.params.name}`);
});
app.get('/nameID/:name/:id', function(req, res){
    res.send(`Name is ${req.params.name} and ID is ${req.params.id}`);
});

app.listen(5000);
console.log('Start');