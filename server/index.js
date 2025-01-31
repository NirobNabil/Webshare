const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.get('/', (req, res, next) => res.send('Hello world!'));
app.get('/port', (req, res, next) => {
  res.set('Content-Type', 'Application/json');  
  res.send(JSON.stringify({'port': process.env.PORT || 7000}))
});
app.get('/receive', (req,res,next) => res.sendFile(path.join(__dirname+'/../client/receiver.html')));
app.get('/send', (req,res,next) => res.sendFile(path.join(__dirname+'/../client/sender.html')));
app.get('/debug', (req,res,next) => res.send(JSON.stringify()))
const server = app.listen(process.env.PORT || 7000);

const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true,
  expire_timeout: 5000,
  debug:1
});

var clientOO;
peerServer.on('connection', (client) => { clientOO=client; console.log("conn - " + client.id) });
peerServer.on('disconnect', (client) => { clientOO=client; console.log("disconn - " + client.id) });

app.use('/peerjs', peerServer);
