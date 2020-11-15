const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');
const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));
app.get('/port', (req, res, next) => {
  res.set('Content-Type', 'Application/json');  
  res.send(JSON.stringify({'port': process.env.PORT || 9000}))
});
app.get('/receive', (req,res,next) => res.sendFile(path.join(__dirname+'/../client/receiver.html')));
app.get('/send', (req,res,next) => res.sendFile(path.join(__dirname+'/../client/sender.html')));
const server = app.listen(process.env.PORT || 9000);

const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true,
  expire_timeout: 500000
});

peerServer.on('connection', (client) => { console.log(client) });

app.use('/peerjs', peerServer);
