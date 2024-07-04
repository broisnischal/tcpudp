// client.ts
import { treaty } from "@elysiajs/eden";
import { App } from ".";
import { ArrayBufferSink } from "bun";

const app = treaty<App>("localhost:3000");

// response type: 'Hi Elysia'
const { data, error } = await app.hi.get();

const { data, error } = await app.mirror.post({
  id: 1,
  name: "Elysia",
  username: "asddf",
});

// The client
// const socket = await Bun.connect({
//   hostname: "localhost",
//   port: 8080,

//   socket: {
//     data(socket, data) {
//       console.log("got data", data.toString("utf-8"));
//     },
//     open(socket) {},
//     close(socket) {},
//     drain(socket) {},
//     error(socket, error) {},

//     // client-specific handlers
//     connectError(socket, error) {}, // connection failed
//     end(socket) {}, // connection closed by server
//     timeout(socket) {}, // connection timed out
//   },
// });

// const sink = new ArrayBufferSink();
// sink.start({ stream: true, highWaterMark: 1024 });
// socket.write("Hi Elysia");

// queueMicrotask(() => {
//   const data = sink.flush();
//   const wrote = socket.write(data);
//   if (wrote < data.byteLength) {
//     // put it back in the sink if the socket is full
//     sink.write(data.subarray(wrote));
//   }
// });

// console.log("running client");
