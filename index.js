const net = require('net');

const sockets = {};

const server = net.createServer(socket => {
  console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`);

  const id = Date.now();
  sockets[id] = socket;

  socket.on('data', data => {
    Object.keys(sockets).forEach(sckId => {
      if (sckId * 1 !== id) {
        sockets[sckId].write(
          `${socket.remoteAddress}:${socket.remotePort}: ${data}`
        );
      }
    });
  });

  socket.on('close', () => {
    delete sockets[id];
    console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('TCP Server is running on port 8000');
});
