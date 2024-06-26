const server = Bun.listen({
  hostname: "localhost",
  port: 8080,
  // tls
  // data: "asdf",
  socket: {
    data(socket, data) {
      // console.log(data);
      console.log("got data", data.toString("utf-8"));

      console.log(data.byteLength);

      socket.write("Hi Elysia SERVER");
      // socket.pipe
    },
    close(socket) {},
    connectError(socket, error) {},
    // handshake(socket, success, authorizationError) {
    //   console.log("handshake");
    //   // success();
    // },
    drain(socket) {},
    open(socket) {
      console.log("open");
    },
  },
});

// server.reload;
// const client = Bun.connect({
//   tls: true,
//   hostname: "localhost",
//   port: 3000,
//   socket: {
//     data(socket, data) {},
//   },
// });
