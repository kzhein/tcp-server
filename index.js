const net = require('net');

const sockets = new Map();

const server = net.createServer(socket => {
  console.log(`CONNECTED: ${socket.remoteAddress}:${socket.remotePort}`);

  sockets.set(socket, socket);

  socket.on('data', data => {
    sockets.forEach(sck => {
      if (sck !== socket) {
        sck.write(`${socket.remoteAddress}:${socket.remotePort}: ${data}`);
      }
    });
  });

  socket.on('close', () => {
    sockets.delete(socket);

    console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('TCP Server is running on port 8000');
});
