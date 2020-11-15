const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));

const server = app.listen(process.env.PORT || 9000);

const peerServer = ExpressPeerServer(server, {
  path: '/myapp'
});

app.use('/peerjs', peerServer);
